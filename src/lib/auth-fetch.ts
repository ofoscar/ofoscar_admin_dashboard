import 'server-only';

import { cookies } from 'next/headers';

export async function authFetch(path: string, options: RequestInit = {}) {
  const cookieStore = await cookies();
  const token = cookieStore.get('access_token')?.value;

  return fetch(`${process.env.API_URL}${path}`, {
    ...options,
    headers: {
      ...options.headers,
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
    },
    cache: 'no-store',
  });
}
