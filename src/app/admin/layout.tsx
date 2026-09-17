import { redirect } from 'next/navigation';

import { authFetch } from '@/lib/auth-fetch';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const response = await authFetch('/auth/me');

  if (!response.ok) {
    redirect('/login');
  }

  return <>{children}</>;
}
