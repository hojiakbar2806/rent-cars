from pydantic import BaseModel


class OAuthProviderConfig(BaseModel):
    client_id: str
    client_secret: str
    access_token_url: str
    user_info_url: str
    auth_url: str
    token_field: str = "access_token"
    authorize_redirect_uri: str
    scope: str