from datetime import datetime, timedelta

from fastapi.security import OAuth2PasswordRequestForm
from jose import jwt
from passlib.context import CryptContext
from sqlalchemy.orm import Session

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
        # data.username is email in this case. Frontend passes username like username:email@test.com
        user = session.query(UserModel).filter(UserModel.email == data.username).first()
        if not user:
            return False
        if not self.bcrypt_context.verify(data.password, user.password):
            return False
        return user

    def create_token(self, username: str, id: int):
        encode = {"sub": username, "id":id}
        expires = datetime.utcnow() + timedelta(minutes=settings.access_token_expire_min)
        encode.update({"exp": int(expires.timestamp())})
        return jwt.encode(encode, self.SECRET_KEY, algorithm=self.ALGORITHM)

    def get_current_user(self, token):
        payload = jwt.decode(token, self.SECRET_KEY, algorithms=self.ALGORITHM)
        username: str = payload.get("sub")
        user_id: int = payload.get("id")
        if username is None or user_id is None:
            return False
        return  {"username": username, "id": user_id}