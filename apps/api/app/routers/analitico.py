"""Endpoints analíticos, escritos à mão (o CRUD genérico não cobre agregações)."""

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_session
from app.models import Indicador, Territorio
from app.schemas import ResumoResponse, SerieResponse, TerritoriosResponse, TerritorioRead
from app.services import agregacao

router = APIRouter(tags=["Analítico"])
Session = Annotated[AsyncSession, Depends(get_session)]
TerritorioQuery = Annotated[str, Query(description='Código IBGE da UF ou "BR" para Brasil')]


async def _indicador(session: AsyncSession, indicador_id: int) -> Indicador:
    indicador = await session.get(Indicador, indicador_id)
    if indicador is None:
        raise HTTPException(status_code=404, detail="Indicador não encontrado")
    return indicador


@router.get("/territorios", response_model=list[TerritorioRead])
async def listar_territorios(session: Session):
    rows = await session.scalars(select(Territorio).order_by(Territorio.nome))
    return list(rows)


@router.get("/indicadores/{indicador_id}/serie", response_model=SerieResponse)
async def serie(indicador_id: int, session: Session, territorio: TerritorioQuery = agregacao.BRASIL):
    indicador = await _indicador(session, indicador_id)
    pontos = await agregacao.serie(session, indicador, territorio)
    return SerieResponse(indicador_id=indicador_id, territorio=territorio, pontos=pontos)


@router.get("/indicadores/{indicador_id}/resumo", response_model=ResumoResponse)
async def resumo(indicador_id: int, session: Session, territorio: TerritorioQuery = agregacao.BRASIL):
    indicador = await _indicador(session, indicador_id)
    pontos = await agregacao.serie(session, indicador, territorio)
    atual = pontos[-1] if pontos else None
    anterior = pontos[-2] if len(pontos) > 1 else None
    variacao = None
    if atual and anterior and anterior.valor:
        variacao = round((atual.valor - anterior.valor) / anterior.valor * 100, 1)
    return ResumoResponse(
        indicador_id=indicador_id,
        territorio=territorio,
        periodo=atual.periodo if atual else None,
        valor=atual.valor if atual else None,
        periodo_anterior=anterior.periodo if anterior else None,
        valor_anterior=anterior.valor if anterior else None,
        variacao_percentual=variacao,
    )


@router.get("/indicadores/{indicador_id}/territorios", response_model=TerritoriosResponse)
async def por_territorio(
    indicador_id: int,
    session: Session,
    periodo: Annotated[str | None, Query(description="Semana epidemiológica AAAA-SS. Padrão: a mais recente")] = None,
):
    indicador = await _indicador(session, indicador_id)
    periodo = periodo or await agregacao.ultimo_periodo(session, indicador)
    if periodo is None:
        return TerritoriosResponse(indicador_id=indicador_id, periodo="", valores=[])
    valores = await agregacao.por_territorio(session, indicador, periodo)
    return TerritoriosResponse(indicador_id=indicador_id, periodo=periodo, valores=valores)
