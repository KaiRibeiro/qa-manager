from fastapi import APIRouter

from .endpoints.users import users_api
from .endpoints.auth import auth_api
from .endpoints.test_plans import test_plans_api
from .endpoints.test_cases import test_cases_api
from .endpoints.associations.plan_case import plan_case_api
from .endpoints.test_steps import test_steps_api
from .endpoints.associations.case_test import case_test_api

api_router = APIRouter()

api_router.include_router(users_api.router, prefix="/users", tags=["users"])
api_router.include_router(auth_api.router, prefix="/auth", tags=["auth"])
api_router.include_router(test_plans_api.router, prefix="/plans", tags=["plans"])
api_router.include_router(test_cases_api.router, prefix="/cases", tags=["cases"])
api_router.include_router(plan_case_api.router, prefix="/associations", tags=["associations"])
api_router.include_router(case_test_api.router, prefix="/associations", tags=["associations"])
api_router.include_router(test_steps_api.router, prefix="/steps", tags=["steps"])
