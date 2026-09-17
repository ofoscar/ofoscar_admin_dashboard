import { authFetch } from './auth-fetch';

export type CurrentUser = {
  email: string;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const response = await authFetch('/auth/me');

  if (!response.ok) {
    return null;
  }

  return response.json();
}
