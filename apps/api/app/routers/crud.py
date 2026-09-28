"""Rotas CRUD geradas pelo FastCRUD.

Cada crud_router cria: POST {path}, GET {path} (paginado), GET {path}/{id},
PATCH {path}/{id} e DELETE {path}/{id}.
"""

from fastcrud import FilterConfig, crud_router

from app.core.db import get_session
from app.models import Indicador, Tema
from app.schemas import IndicadorCreate, IndicadorRead, IndicadorUpdate, TemaCreate, TemaRead, TemaUpdate

temas_router = crud_router(
    session=get_session,
    model=Tema,
    create_schema=TemaCreate,
    update_schema=TemaUpdate,
    select_schema=TemaRead,
    path="/temas",
    tags=["Temas"],
)

indicadores_router = crud_router(
    session=get_session,
    model=Indicador,
    create_schema=IndicadorCreate,
    update_schema=IndicadorUpdate,
    select_schema=IndicadorRead,
    path="/indicadores",
    tags=["Indicadores"],
    # Permite GET /indicadores?tema_id=1&status=hipotese
    filter_config=FilterConfig(tema_id=None, status=None, codigo=None),
)
