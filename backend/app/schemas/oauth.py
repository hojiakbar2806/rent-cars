from typing import Optional
from pydantic import BaseModel


class OAuthProviderConfig(BaseModel):
    client_id: str
    client_secret: str
    access_token_url: str
    auth_url: str
    authorize_redirect_uri: str
    oauth_kwargs: Optional[dict] = None