"""Configuração da API, lida de variáveis de ambiente (ou do arquivo .env)."""

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    app_name: str = "Hub de Indicadores CNIE"
    # Padrão: SQLite local, para rodar sem Docker.
    # No docker-compose, é sobrescrito por postgresql+asyncpg://...
    database_url: str = "sqlite+aiosqlite:///./hub.db"
    cors_origins: list[str] = ["http://localhost:3000"]
    # Popula o banco com dados fictícios na primeira execução.
    seed_on_startup: bool = True


settings = Settings()
