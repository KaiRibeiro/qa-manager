
from pydantic import EmailStr

from models import UserModel
from schemas import UserCreateSchema, UserOutSchema
from services.auth.auth_service import AuthService


class UserService:
    def __init__(self, session):
        self.session = session

    def check_user_exists(self, email: EmailStr):
        return self.session.query(UserModel).filter(UserModel.email == email).first() is not None


    def create_user(self, request_data: UserCreateSchema):
        auth_service = AuthService()
        hashed_password = auth_service.hash_password(request_data.password)
        user_item = UserModel(name=request_data.name, email=request_data.email,
                              password=hashed_password)
        self.session.add(user_item)
        self.session.commit()
        self.session.refresh(user_item)
        user_out = UserOutSchema(id=user_item.id, name=user_item.name, email=user_item.email, created_at=user_item.created_at)
        return user_out
