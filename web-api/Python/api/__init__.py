from fastapi import APIRouter
from .endpoints import hello_world

api_router = APIRouter()

api_router.include_router(hello_world.router, prefix="/hello", tags=["hello"])
