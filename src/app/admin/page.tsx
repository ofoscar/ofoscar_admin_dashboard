import { redirect } from 'next/navigation';
import { authFetch } from '../../lib/auth-fetch';

export default async function AdminPage() {
  const response = await authFetch('/auth/me');

  if (response.status === 401) {
    redirect('/login');
  }

  const user = await response.json();

  return (
    <main>
      <div>
        <h1>Hello {user.email}</h1>
      </div>
    </main>
  );
}
