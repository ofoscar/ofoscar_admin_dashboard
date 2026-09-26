import { redirect } from 'next/navigation';

import AppBar from '@/components/app-bar';
import { getCurrentUser } from '@/lib/auth';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <>
      <AppBar email={user.email} />
      <main className='p-4'>{children}</main>
    </>
  );
}
