import os

TEST_DB = "test.db"
os.environ["DATABASE_URL"] = f"sqlite+aiosqlite:///./{TEST_DB}"
if os.path.exists(TEST_DB):
    os.remove(TEST_DB)

import pytest
from httpx import ASGITransport, AsyncClient

from app.main import app, lifespan


@pytest.fixture
async def client():
    # O lifespan cria as tabelas e popula os dados fictícios (só na primeira vez).
    async with lifespan(app):
        async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as c:
            yield c


async def test_health(client):
    r = await client.get("/health")
    assert r.json() == {"status": "ok"}


async def test_crud_indicadores(client):
    r = await client.get("/api/indicadores")
    assert r.status_code == 200
    body = r.json()
    assert len(body["data"]) == 3


async def test_positividade_brasil_agrega_por_razao(client):
    r = await client.get("/api/indicadores/1/serie")
    pontos = r.json()["pontos"]
    assert len(pontos) == 26
    p = pontos[0]
    # Brasil = soma(numerador)/soma(denominador)*100, nunca média de percentuais
    assert p["valor"] == pytest.approx(p["numerador"] / p["denominador"] * 100, rel=1e-3)


async def test_resumo_e_territorios(client):
    r = await client.get("/api/indicadores/2/resumo", params={"territorio": "43"})
    assert r.json()["periodo"] == "2026-38"
    r = await client.get("/api/indicadores/2/territorios")
    assert len(r.json()["valores"]) == 27


async def test_indicador_inexistente(client):
    r = await client.get("/api/indicadores/999/serie")
    assert r.status_code == 404
