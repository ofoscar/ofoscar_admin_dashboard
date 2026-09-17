import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { authFetch } from '../../lib/auth-fetch';
import { LoginForm } from './login-form';

export const metadata: Metadata = {
  title: 'Sign in',
};

export default async function LoginPage() {
  const response = await authFetch('/auth/me');

  if (response.ok) {
    redirect('/admin');
  }

  return (
    <main className='flex flex-1 items-center justify-center px-4 py-16'>
      <div className='w-full max-w-sm'>
        <h1 className='mb-6 text-xl font-semibold'>Sign in</h1>
        <LoginForm />
      </div>
    </main>
  );
}
