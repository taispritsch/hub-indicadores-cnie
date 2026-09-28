"""Schemas Pydantic. Os de Create/Update/Read alimentam o FastCRUD."""

from pydantic import BaseModel, ConfigDict


class _Base(BaseModel):
    model_config = ConfigDict(from_attributes=True)


# ---------- Tema ----------
class TemaCreate(_Base):
    nome: str
    descricao: str | None = None
    ordem: int = 0


class TemaUpdate(_Base):
    nome: str | None = None
    descricao: str | None = None
    ordem: int | None = None


class TemaRead(TemaCreate):
    id: int


# ---------- Indicador ----------
class IndicadorCreate(_Base):
    codigo: str
    tema_id: int
    nome: str
    nome_curto: str
    conceituacao: str
    interpretacao: str | None = None
    metodo_calculo: str
    unidade: str
    polaridade: str = "neutro"
    agregacao: str = "soma"
    fator: float = 1
    casas_decimais: int = 0
    fonte: str | None = None
    periodicidade: str = "semanal"
    limitacoes: str | None = None
    status: str = "hipotese"


class IndicadorUpdate(_Base):
    nome: str | None = None
    nome_curto: str | None = None
    conceituacao: str | None = None
    interpretacao: str | None = None
    metodo_calculo: str | None = None
    unidade: str | None = None
    polaridade: str | None = None
    fonte: str | None = None
    limitacoes: str | None = None
    status: str | None = None


class IndicadorRead(IndicadorCreate):
    id: int


# ---------- Territorio ----------
class TerritorioRead(_Base):
    codigo: str
    sigla: str
    nome: str
    nivel: str
    regiao: str


# ---------- Consultas analíticas (endpoints próprios) ----------
class PontoSerie(_Base):
    periodo: str
    valor: float
    numerador: float | None = None
    denominador: float | None = None


class SerieResponse(_Base):
    indicador_id: int
    territorio: str  # código IBGE ou "BR"
    pontos: list[PontoSerie]


class ValorTerritorio(_Base):
    codigo: str
    sigla: str
    nome: str
    valor: float
    numerador: float | None = None
    denominador: float | None = None


class TerritoriosResponse(_Base):
    indicador_id: int
    periodo: str
    valores: list[ValorTerritorio]


class ResumoResponse(_Base):
    """Dados do card de KPI: último valor e variação em relação ao período anterior."""

    indicador_id: int
    territorio: str
    periodo: str | None
    valor: float | None
    periodo_anterior: str | None
    valor_anterior: float | None
    variacao_percentual: float | None
