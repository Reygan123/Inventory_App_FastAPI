# main.py
from fastapi import FastAPI
from api.api_v1.api import api_router
from core.config import settings
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

@app.middleware("http")
async def print_headers(request, call_next):
    response = await call_next(request)
    print("Response Headers:", response.headers)
    return response

app.include_router(api_router, prefix=settings.API_V1_STR)
