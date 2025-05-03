from pathlib import Path
from pydantic_settings import BaseSettings
from pydantic import Field, SecretStr


class Settings(BaseSettings):
    app_name: str
    app_env: str
    app_debug: bool
    app_host: str
    app_port: int

    api_prefix: str

    db_user: str = Field(alias='POSTGRES_USER')
    db_pass: str = Field(alias='POSTGRES_PASSWORD')
    db_name: str = Field(alias='POSTGRES_DB')
    db_host: str = Field(alias='POSTGRES_HOST')
    db_port: int = Field(alias='POSTGRES_PORT')

    @property
    def db_url(self):
        return f"postgresql+asyncpg://{self.db_user}:{self.db_pass}@{self.db_host}:{self.db_port}/{self.db_name}"

    jwt_secret_key: SecretStr
    jwt_algorithm: str
    jwt_access_token_expire_minutes: int
    jwt_refresh_token_expire_minutes: int
    jwt_public_key_path: Path
    jwt_private_key_path: Path

    google_client_id: str
    google_client_secret: str

    github_client_id: str
    github_client_secret: str

    oauth_redirect_uri: str

    allowed_file_extensions: set = {"jpg", "jpeg", "png", "webp", "tiff"}
    file_uploads_path: str = "uploads"

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "extra": "allow",
    }


settings = Settings()