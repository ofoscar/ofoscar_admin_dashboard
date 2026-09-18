import { getCurrentUser } from '@/lib/auth';
import Link from 'next/link';

export default async function AdminPage() {
  const user = await getCurrentUser();
  return (
    <main>
      <div className='flex flex-col'>
        <p>{user?.email}</p>
        <Link
          href='/admin/projects'
          className='text-blue-500 hover:text-blue-800'
        >
          Projects
        </Link>
      </div>
    </main>
  );
}
