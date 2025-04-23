from datetime import datetime
from typing import Annotated

from fastapi import APIRouter, HTTPException
from fastapi.params import Depends
from sqlalchemy.orm import Session
from starlette import status

from api.endpoints.auth_api import get_current_user
from db.session import get_session
from schemas import UserOutSchema, UserCreateSchema

router = APIRouter()
user_dependency = Annotated[dict, Depends(get_current_user)]


@router.get("/", response_model=UserOutSchema)
async def get_users(user: user_dependency, session: Session = Depends(get_session)):
    ## JUST AN AUTHORIZATION CHECK FOR NOW
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization Error"
        )
    return UserOutSchema(id=2, name="Kaique", email="kaique@email.com", created_at=datetime.now())