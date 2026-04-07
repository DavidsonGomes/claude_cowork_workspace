from pathlib import Path

from pydantic_settings import BaseSettings

# app/config.py → app/ → backend/ → dashboard/ → workspace root
_WORKSPACE_ROOT_DEFAULT = str(Path(__file__).parent.parent.parent.parent)


class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite+aiosqlite:///data/evo-dashboard.db"
    DATABASE_URL_SYNC: str = "sqlite:///data/evo-dashboard.db"
    API_HOST: str = "127.0.0.1"
    API_PORT: int = 8000
    WORKSPACE_ROOT: str = _WORKSPACE_ROOT_DEFAULT

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
