from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import JWTError
from sqlalchemy.orm import Session
from starlette import status

from db.session import get_session

from schemas import UserCreateSchema, TokenSchema
from services import UserService
from services.auth.auth_service import AuthService

router = APIRouter()
oauth2_bearer = OAuth2PasswordBearer(tokenUrl="auth/token")

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
    except Exception as e:
        session.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="An unexpected error occurred while registering the user"
        )


@router.post("/login", response_model=TokenSchema)
async def login_get_token(data: Annotated[OAuth2PasswordRequestForm, Depends()], session: Session = Depends(get_session)):
    auth_service = AuthService()
    user = auth_service.authenticate_user(data, session)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Couldn't validate user."
        )
    token = auth_service.create_token(user.email, user.id)
    return {"access_token": token, "token_type": "bearer"}

async def get_current_user(token: Annotated[str, Depends(oauth2_bearer)]):
    auth_service = AuthService()
    try:
        user = auth_service.get_current_user(token)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Couldn't validate user."
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Couldn't validate user."
        )
    return user