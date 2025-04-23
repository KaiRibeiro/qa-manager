from pathlib import Path
from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict

PROJECT_ROOT = Path(__file__).resolve().parents[1]
ENV_PATH = PROJECT_ROOT / ".env"

class Settings(BaseSettings):
    app_name: str = "QA Manager"
    environment: str = "dev"
    debug: bool = Field(True, alias="DEBUG")
    secret_key: str = Field(..., alias="SECRET_KEY")
    access_token_expire_min: int = 30
    db_url: str = Field(..., alias="DB_URL")

    model_config = SettingsConfigDict(
        env_file=str(ENV_PATH),
        env_file_encoding="utf-8",
        case_sensitive=False
    )

settings = Settings()
print(settings.db_url)
