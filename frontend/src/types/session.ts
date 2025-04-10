export interface UserSession {
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    is_admin: boolean;
  } | null;
  token: string | null;
}

