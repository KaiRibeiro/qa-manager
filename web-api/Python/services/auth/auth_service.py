from datetime import datetime, timedelta

from fastapi import HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt, JWTError
from passlib.context import CryptContext
from sqlalchemy.orm import Session
from starlette import status

from core.config import settings
from models import UserModel


class AuthService:
    def __init__(self):
        self.SECRET_KEY = settings.secret_key
        self.ALGORITHM = settings.algorithm
        self.bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    def hash_password(self, password: str):
        return self.bcrypt_context.hash(password)

    def authenticate_user(self, data: OAuth2PasswordRequestForm, session: Session):
        user = session.query(UserModel).filter(UserModel.email == data.username).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        if not self.bcrypt_context.verify(data.password, user.password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
                headers={"WWW-Authenticate": "Bearer"},
            )
        return user

    def create_token(self, username: str, id: int):
        encode = {"sub": username, "id": id}
        expires = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_min)
        encode.update({"exp": expires})
        return jwt.encode(encode, self.SECRET_KEY, algorithm=self.ALGORITHM)

    def get_current_user(self, token):
        try:
            payload = jwt.decode(token, self.SECRET_KEY, algorithms=[self.ALGORITHM])
            username: str = payload.get("sub")
            user_id: int = payload.get("id")
            if username is None or user_id is None:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token payload",
                    headers={"WWW-Authenticate": "Bearer"},
                )
            return {"username": username, "id": user_id}
        except JWTError:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token",
                headers={"WWW-Authenticate": "Bearer"},
            )