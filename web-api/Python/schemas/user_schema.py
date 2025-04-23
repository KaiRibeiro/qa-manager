from datetime import datetime
from pydantic import BaseModel, EmailStr


class UserCreateSchema(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserOutSchema(BaseModel):
    id: int
    name: str
    email: EmailStr
    created_at: datetime