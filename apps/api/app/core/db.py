"""Engine, sessão assíncrona e classe base dos modelos."""

from collections.abc import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine
from sqlalchemy.orm import DeclarativeBase

from app.core.config import settings

engine = create_async_engine(settings.database_url, echo=False)
SessionLocal = async_sessionmaker(engine, expire_on_commit=False)


class Base(DeclarativeBase):
    pass


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with SessionLocal() as session:
        yield session


async def create_tables() -> None:
    # Suficiente para o repositório mínimo. Quando o modelo estabilizar,
    # substituir por migrações com Alembic (ver README, "Próximos passos").
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
