from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.db import SessionLocal, create_tables
from app.routers.analitico import router as analitico_router
from app.routers.crud import indicadores_router, temas_router
from app.seed import seed_if_empty


@asynccontextmanager
async def lifespan(_: FastAPI):
    await create_tables()
    if settings.seed_on_startup:
        async with SessionLocal() as session:
            await seed_if_empty(session)
    yield


app = FastAPI(title=settings.app_name, version="0.1.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Os endpoints analíticos são registrados antes dos CRUD para que
# /indicadores/{id}/serie não conflite com /indicadores/{id}.
app.include_router(analitico_router, prefix="/api")
app.include_router(temas_router, prefix="/api")
app.include_router(indicadores_router, prefix="/api")


@app.get("/health", tags=["Infra"])
async def health():
    return {"status": "ok"}
