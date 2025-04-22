


export type UserSession = {
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    is_admin: boolean;
  };
  access_token: string;
} | null

