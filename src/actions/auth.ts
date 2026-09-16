'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export type LoginState = {
  error?: string;
};

export async function login(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || !email.includes('@')) {
    return { error: 'Enter a valid email address.' };
  }

  if (typeof password !== 'string' || password.length < 8) {
    return { error: 'Password must be at least 8 characters.' };
  }

  const body = new URLSearchParams();

  // FastAPI OAuth2PasswordRequestForm expects "username"
  body.set('username', email);
  body.set('password', password);

  const response = await fetch(`${process.env.API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body,
    cache: 'no-store',
  });

  if (!response.ok) {
    return {
      error: 'Invalid email or password.',
    };
  }

  const data = await response.json();

  const cookieStore = await cookies();

  cookieStore.set('access_token', data.access_token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 30,
  });

  redirect('/admin');
}
