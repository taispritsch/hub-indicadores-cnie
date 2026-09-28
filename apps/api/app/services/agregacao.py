"""Regras de agregação de valores de indicadores.

Nunca faça média de percentuais entre territórios: para indicadores de razão,
soma-se numerador e denominador e só então se calcula o valor.
"""

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Indicador, Territorio, ValorIndicador
from app.schemas import PontoSerie, ValorTerritorio

BRASIL = "BR"


def _calcular(indicador: Indicador, soma_valor: float, soma_num: float | None, soma_den: float | None) -> float:
    if indicador.agregacao == "razao":
        if not soma_den:
            return 0.0
        return round((soma_num or 0) / soma_den * indicador.fator, indicador.casas_decimais + 2)
    return soma_valor


async def serie(session: AsyncSession, indicador: Indicador, territorio: str = BRASIL) -> list[PontoSerie]:
    filtro = [ValorIndicador.indicador_id == indicador.id]
    if territorio != BRASIL:
        filtro.append(ValorIndicador.territorio_codigo == territorio)

    stmt = (
        select(
            ValorIndicador.periodo,
            func.sum(ValorIndicador.valor),
            func.sum(ValorIndicador.numerador),
            func.sum(ValorIndicador.denominador),
        )
        .where(*filtro)
        .group_by(ValorIndicador.periodo)
        .order_by(ValorIndicador.periodo)
    )
    rows = (await session.execute(stmt)).all()
    return [
        PontoSerie(periodo=p, valor=_calcular(indicador, v, n, d), numerador=n, denominador=d)
        for p, v, n, d in rows
    ]


async def ultimo_periodo(session: AsyncSession, indicador: Indicador) -> str | None:
    stmt = select(func.max(ValorIndicador.periodo)).where(ValorIndicador.indicador_id == indicador.id)
    return (await session.execute(stmt)).scalar()


async def por_territorio(session: AsyncSession, indicador: Indicador, periodo: str) -> list[ValorTerritorio]:
    stmt = (
        select(ValorIndicador, Territorio)
        .join(Territorio, Territorio.codigo == ValorIndicador.territorio_codigo)
        .where(ValorIndicador.indicador_id == indicador.id, ValorIndicador.periodo == periodo)
        .order_by(ValorIndicador.valor.desc())
    )
    rows = (await session.execute(stmt)).all()
    return [
        ValorTerritorio(
            codigo=t.codigo, sigla=t.sigla, nome=t.nome,
            valor=v.valor, numerador=v.numerador, denominador=v.denominador,
        )
        for v, t in rows
    ]
