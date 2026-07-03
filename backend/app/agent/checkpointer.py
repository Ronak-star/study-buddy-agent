from functools import lru_cache

from langgraph.checkpoint.sqlite.aio import AsyncSqliteSaver

from app.core.config import settings

_checkpointer_cm = None
_checkpointer = None


async def get_checkpointer():
    """Returns a process-wide singleton async checkpointer."""
    global _checkpointer_cm, _checkpointer
    if _checkpointer is None:
        conn_string = settings.SQLITE_CHECKPOINT_PATH
        _checkpointer_cm = AsyncSqliteSaver.from_conn_string(conn_string)
        _checkpointer = await _checkpointer_cm.__aenter__()
    return _checkpointer