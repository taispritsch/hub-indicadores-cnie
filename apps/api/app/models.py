"""Modelo de dados, derivado de docs/indicadores-catalogo.md (seção 6)."""

from datetime import datetime

from sqlalchemy import DateTime, Float, ForeignKey, String, Text, UniqueConstraint, func
from sqlalchemy.orm import Mapped, mapped_column

from app.core.db import Base


class Tema(Base):
    __tablename__ = "tema"

    id: Mapped[int] = mapped_column(primary_key=True)
    nome: Mapped[str] = mapped_column(String(120), unique=True)
    descricao: Mapped[str | None] = mapped_column(Text)
    ordem: Mapped[int] = mapped_column(default=0)


class Territorio(Base):
    """Por enquanto só UFs. Código IBGE de 2 dígitos."""

    __tablename__ = "territorio"

    codigo: Mapped[str] = mapped_column(String(7), primary_key=True)
    sigla: Mapped[str] = mapped_column(String(2))
    nome: Mapped[str] = mapped_column(String(120))
    nivel: Mapped[str] = mapped_column(String(20), default="uf")
    regiao: Mapped[str] = mapped_column(String(20))


class Indicador(Base):
    """Ficha técnica do indicador (campos do modelo de ficha do catálogo)."""

    __tablename__ = "indicador"

    id: Mapped[int] = mapped_column(primary_key=True)
    codigo: Mapped[str] = mapped_column(String(20), unique=True)  # ex.: IND-001
    tema_id: Mapped[int] = mapped_column(ForeignKey("tema.id"))
    nome: Mapped[str] = mapped_column(String(200))
    nome_curto: Mapped[str] = mapped_column(String(40))
    conceituacao: Mapped[str] = mapped_column(Text)
    interpretacao: Mapped[str | None] = mapped_column(Text)
    metodo_calculo: Mapped[str] = mapped_column(Text)
    unidade: Mapped[str] = mapped_column(String(20))  # "%", "exames", "alertas"...
    polaridade: Mapped[str] = mapped_column(String(20), default="neutro")  # maior_melhor | menor_melhor | neutro
    # Como agregar UFs em Brasil:
    #   "razao" -> soma(numerador) / soma(denominador) * fator
    #   "soma"  -> soma(valor)
    agregacao: Mapped[str] = mapped_column(String(10), default="soma")
    fator: Mapped[float] = mapped_column(Float, default=1)
    casas_decimais: Mapped[int] = mapped_column(default=0)
    fonte: Mapped[str | None] = mapped_column(String(200))
    periodicidade: Mapped[str] = mapped_column(String(20), default="semanal")
    limitacoes: Mapped[str | None] = mapped_column(Text)
    status: Mapped[str] = mapped_column(String(20), default="hipotese")
    updated_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), onupdate=func.now()
    )


class ValorIndicador(Base):
    """Fato: um valor por indicador × período × território."""

    __tablename__ = "valor_indicador"
    __table_args__ = (UniqueConstraint("indicador_id", "periodo", "territorio_codigo"),)

    id: Mapped[int] = mapped_column(primary_key=True)
    indicador_id: Mapped[int] = mapped_column(ForeignKey("indicador.id"), index=True)
    periodo: Mapped[str] = mapped_column(String(10), index=True)  # semana epidemiológica "AAAA-SS"
    territorio_codigo: Mapped[str] = mapped_column(ForeignKey("territorio.codigo"), index=True)
    valor: Mapped[float] = mapped_column(Float)
    numerador: Mapped[float | None] = mapped_column(Float)
    denominador: Mapped[float | None] = mapped_column(Float)
