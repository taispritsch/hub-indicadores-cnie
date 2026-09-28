"""Dados FICTÍCIOS para desenvolvimento.

Os indicadores seguem as fichas-hipótese de docs/indicadores-catalogo.md.
Nenhum valor aqui representa dado real. Substituir pela carga das fontes oficiais.

Execução manual:  uv run python -m app.seed
"""

import asyncio
import math
import random

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models import Indicador, Tema, Territorio, ValorIndicador

# (código IBGE, sigla, nome, região, peso populacional aproximado)
UFS = [
    ("11", "RO", "Rondônia", "Norte", 0.8), ("12", "AC", "Acre", "Norte", 0.4),
    ("13", "AM", "Amazonas", "Norte", 1.9), ("14", "RR", "Roraima", "Norte", 0.3),
    ("15", "PA", "Pará", "Norte", 4.0), ("16", "AP", "Amapá", "Norte", 0.4),
    ("17", "TO", "Tocantins", "Norte", 0.7), ("21", "MA", "Maranhão", "Nordeste", 3.3),
    ("22", "PI", "Piauí", "Nordeste", 1.6), ("23", "CE", "Ceará", "Nordeste", 4.3),
    ("24", "RN", "Rio Grande do Norte", "Nordeste", 1.6), ("25", "PB", "Paraíba", "Nordeste", 1.9),
    ("26", "PE", "Pernambuco", "Nordeste", 4.4), ("27", "AL", "Alagoas", "Nordeste", 1.5),
    ("28", "SE", "Sergipe", "Nordeste", 1.1), ("29", "BA", "Bahia", "Nordeste", 6.9),
    ("31", "MG", "Minas Gerais", "Sudeste", 10.1), ("32", "ES", "Espírito Santo", "Sudeste", 1.9),
    ("33", "RJ", "Rio de Janeiro", "Sudeste", 7.9), ("35", "SP", "São Paulo", "Sudeste", 21.6),
    ("41", "PR", "Paraná", "Sul", 5.6), ("42", "SC", "Santa Catarina", "Sul", 3.7),
    ("43", "RS", "Rio Grande do Sul", "Sul", 5.3), ("50", "MS", "Mato Grosso do Sul", "Centro-Oeste", 1.4),
    ("51", "MT", "Mato Grosso", "Centro-Oeste", 1.8), ("52", "GO", "Goiás", "Centro-Oeste", 3.5),
    ("53", "DF", "Distrito Federal", "Centro-Oeste", 1.4),
]

SEMANAS = [f"2026-{s:02d}" for s in range(13, 39)]  # 26 semanas epidemiológicas

TEMAS = [
    ("Vigilância laboratorial", "Produção e resultados de exames da rede de laboratórios de saúde pública.", 1),
    ("Detecção de sinais", "Sinais e alertas gerados a partir do monitoramento.", 2),
]

INDICADORES = [
    dict(
        codigo="IND-001", tema=0, nome="Positividade laboratorial", nome_curto="Positividade",
        conceituacao="Proporção de exames com resultado positivo entre os exames com resultado liberado.",
        interpretacao="Aumento sustentado pode indicar maior circulação do agente.",
        metodo_calculo="(exames positivos ÷ exames com resultado) × 100",
        unidade="%", polaridade="menor_melhor", agregacao="razao", fator=100, casas_decimais=1,
        fonte="A definir (dados fictícios)",
        limitacoes="Sensível ao volume testado; semanas com poucos exames geram oscilações.",
    ),
    dict(
        codigo="IND-002", tema=0, nome="Volume de exames realizados", nome_curto="Exames realizados",
        conceituacao="Número de exames com resultado liberado no período.",
        interpretacao="Contexto para a positividade. Quedas bruscas podem indicar falha no envio de dados.",
        metodo_calculo="Contagem de exames com resultado liberado",
        unidade="exames", polaridade="neutro", agregacao="soma", fator=1, casas_decimais=0,
        fonte="A definir (dados fictícios)",
        limitacoes="Atraso na liberação de resultados afeta as semanas mais recentes.",
    ),
    dict(
        codigo="IND-004", tema=1, nome="Sinais/alertas ativos", nome_curto="Alertas ativos",
        conceituacao="Número de sinais que ultrapassaram o limiar de detecção e estão em aberto.",
        interpretacao="Aponta onde há necessidade de investigação.",
        metodo_calculo="A definir: depende do método de detecção (limiar, média móvel, canal endêmico).",
        unidade="alertas", polaridade="menor_melhor", agregacao="soma", fator=1, casas_decimais=0,
        fonte="A definir (dados fictícios)",
        limitacoes="Método de detecção ainda não documentado.",
    ),
]


async def seed_if_empty(session: AsyncSession) -> bool:
    if await session.scalar(select(func.count()).select_from(Indicador)):
        return False

    rng = random.Random(42)  # determinístico: mesmos dados em toda máquina

    session.add_all(Territorio(codigo=c, sigla=s, nome=n, regiao=r) for c, s, n, r, _ in UFS)

    temas = [Tema(nome=n, descricao=d, ordem=o) for n, d, o in TEMAS]
    session.add_all(temas)
    await session.flush()

    indicadores = []
    for spec in INDICADORES:
        dados = {k: v for k, v in spec.items() if k != "tema"}
        ind = Indicador(tema_id=temas[spec["tema"]].id, **dados)
        indicadores.append(ind)
    session.add_all(indicadores)
    await session.flush()
    positividade, exames, alertas = indicadores

    for codigo, _, _, _, peso in UFS:
        fase = rng.uniform(0, 2 * math.pi)
        base_pos = rng.uniform(0.06, 0.14)
        for i, semana in enumerate(SEMANAS):
            onda = 1 + 0.45 * math.sin(i / 4.5 + fase)
            n_exames = round(peso * 900 * rng.uniform(0.85, 1.15))
            n_pos = round(n_exames * base_pos * onda * rng.uniform(0.9, 1.1))
            n_alertas = max(0, round(peso * 0.4 * onda + rng.gauss(0, 0.8)))

            session.add_all([
                ValorIndicador(indicador_id=exames.id, periodo=semana, territorio_codigo=codigo, valor=n_exames),
                ValorIndicador(
                    indicador_id=positividade.id, periodo=semana, territorio_codigo=codigo,
                    valor=round(n_pos / n_exames * 100, 2), numerador=n_pos, denominador=n_exames,
                ),
                ValorIndicador(indicador_id=alertas.id, periodo=semana, territorio_codigo=codigo, valor=n_alertas),
            ])

    await session.commit()
    return True


async def _main() -> None:
    from app.core.db import SessionLocal, create_tables

    await create_tables()
    async with SessionLocal() as session:
        criado = await seed_if_empty(session)
    print("Dados fictícios criados." if criado else "Banco já possui dados; nada foi feito.")


if __name__ == "__main__":
    asyncio.run(_main())
