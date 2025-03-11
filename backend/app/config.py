from pathlib import Path

from pydantic_settings import BaseSettings
from pydantic import Field, SecretStr
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):
    app_name: str
    app_env: str = Field('development')
    app_debug: bool = Field(False)
    app_host: str = Field('127.0.0.1')
    app_port: int = Field(8000)

    # Database settings
    db_user: str = Field(alias='POSTGRES_USER')
    db_pass: str = Field(alias='POSTGRES_PASSWORD')
    db_name: str = Field(alias='POSTGRES_DB')
    db_host: str = Field(alias='POSTGRES_HOST')
    db_port: int = Field(alias='POSTGRES_PORT')

    @property
    def db_url(self):
        return f"postgresql+asyncpg://{self.db_user}:{self.db_pass}@{self.db_host}:{self.db_port}/{self.db_name}"

    # JWT settings
    jwt_secret_key: SecretStr
    jwt_algorithm: str
    jwt_access_token_expire_minutes: int = Field(30)
    jwt_refresh_token_expire_minutes: int = Field((60 * 24 * 2))
    jwt_public_key_path: Path
    jwt_private_key_path: Path

    # OAuth settings
    google_client_id: str
    google_client_secret: str

    github_client_id: str
    github_client_secret: str

    facebook_client_id: str
    facebook_client_secret: str

    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'
        extra = 'ignore'


settings = Settings()
