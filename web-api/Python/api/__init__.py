from fastapi import APIRouter

from .endpoints import users_api, auth_api

api_router = APIRouter()

api_router.include_router(users_api.router, prefix="/users", tags=["users"])
api_router.include_router(auth_api.router, prefix="/auth", tags=["auth"])
