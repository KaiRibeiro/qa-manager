from fastapi import APIRouter

from .endpoints.users import users_api
from .endpoints.auth import auth_api
from .endpoints.test_plans import test_plans_api
from .endpoints.test_cases import test_cases_api

api_router = APIRouter()

api_router.include_router(users_api.router, prefix="/users", tags=["users"])
api_router.include_router(auth_api.router, prefix="/auth", tags=["auth"])
api_router.include_router(test_plans_api.router, prefix="/plans", tags=["plans"])
api_router.include_router(test_cases_api.router, prefix="/cases", tags=["cases"])