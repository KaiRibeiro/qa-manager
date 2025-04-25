from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Response, Request
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import JWTError
from sqlalchemy.orm import Session
from starlette import status

from core.config import settings
from db.session import get_session

from schemas import UserCreateSchema
from services import UserService
from services.auth.auth_service import AuthService

router = APIRouter()
def get_token_from_cookie(request: Request):
    token = request.cookies.get("access_token")
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token missing from cookie"
        )
    return token

@router.post("/", status_code=status.HTTP_201_CREATED)
async def register_user(user: UserCreateSchema, session: Session = Depends(get_session)):
    user_service = UserService(session)
    if user_service.check_user_exists(user.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User already exists"
        )
    try:
        return user_service.create_user(user)
    except Exception:
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred while registering the user"
        )


@router.post("/login")
async def login_get_token(data: Annotated[OAuth2PasswordRequestForm, Depends()],
                          session: Session = Depends(get_session),
                          response: Response = None):
    auth_service = AuthService()
    user = auth_service.authenticate_user(data, session)
    token = auth_service.create_token(user.email, user.id)
    response.set_cookie(
        key="access_token",
        value=token,
        httponly=True,
        secure=not settings.debug,
        samesite="strict",
        max_age=settings.access_token_expire_min * 60
    )
    return {"message": "Login successful", "name": user.name ,"email": user.email, "id": user.id}

@router.post("/logout")
async def logout(response: Response):
    response.delete_cookie("access_token")
    return {"message": "Logged out"}

@router.get("/me")
async def get_current_user(token: Annotated[str, Depends(get_token_from_cookie)]):
    auth_service = AuthService()
    return auth_service.get_current_user(token)