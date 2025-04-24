from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import api_router
from core.config import settings

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["POST", "GET", "PATCH", "PUT"],  # list only the methods you actually need
    allow_headers=["Content-Type", "Authorization"],
)

app.include_router(api_router, prefix="/api")
