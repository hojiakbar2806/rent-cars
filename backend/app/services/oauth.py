from typing import Dict
import httpx
from fastapi import HTTPException
from app.schemas.oauth import OAuthProviderConfig


class OAuthService:
    def __init__(self, providers: Dict[str, OAuthProviderConfig]):
        self.providers = providers

    async def google(self, code: str):
        token_data = await self._get_oauth_token("google", code)
        user_info = await self.google_user_info(token_data)
        return user_info

    async def github(self, code: str) -> dict:
        token_data = await self._get_oauth_token("github", code)
        user_info = await self.github_user_info(token_data)
        return user_info

    async def google_user_info(self, token_data: dict) -> dict:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                headers={
                    "Authorization": f"Bearer {token_data}",
                    "Accept": "application/json"
                }
            )

            if response.status_code != 200:
                raise HTTPException(
                    status_code=400, detail="Failed to obtain user information")
            return response.json()

    async def github_user_info(self, token_data: dict) -> dict:
        async with httpx.AsyncClient() as client:
            user_res = await client.get(
                "https://api.github.com/user",
                headers={
                    "Authorization": f"token {token_data}",
                    "Accept": "application/vnd.github+json"
                }
            )
            user_data = user_res.raise_for_status().json()
            email_res = await client.get(
                "https://api.github.com/user/emails",
                headers={
                    "Authorization": f"token {token_data}",
                    "Accept": "application/vnd.github+json"
                }
            )
            emails = email_res.raise_for_status().json()
            primary_email = next(
                (e["email"] for e in emails if e["primary"] and e["verified"]),
                None
            )
            return {
                "username": user_data["login"],
                "name": user_data.get("name"),
                "email": primary_email,
                "avatar_url": user_data.get("avatar_url"),
                "profile_url": user_data.get("html_url"),
            }

    async def _get_oauth_token(self, provider: str, code: str) -> dict:
        provider_config = self.providers.get(provider)
        if not provider_config:
            raise HTTPException(
                status_code=400, detail="Invalid OAuth provider")

        async with httpx.AsyncClient() as client:
            try:
                response = await client.post(
                    provider_config.access_token_url,
                    data={
                        "code": code,
                        "client_id": provider_config.client_id,
                        "client_secret": provider_config.client_secret,
                        "redirect_uri": provider_config.authorize_redirect_uri,
                        "grant_type": "authorization_code",
                        "scope": provider_config.scope
                    },
                    headers={"Accept": "application/json"}
                )
                tokens = response.raise_for_status().json()
                return tokens[provider_config.token_field]
            except Exception as e:
                raise HTTPException(
                    status_code=400,
                    detail=f"Failed to fetch access token {e}"
                )
