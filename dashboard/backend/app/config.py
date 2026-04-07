from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    DATABASE_URL: str = "sqlite+aiosqlite:///data/evo-dashboard.db"
    DATABASE_URL_SYNC: str = "sqlite:///data/evo-dashboard.db"
    API_HOST: str = "127.0.0.1"
    API_PORT: int = 8000

    model_config = {"env_file": ".env", "extra": "ignore"}


settings = Settings()
