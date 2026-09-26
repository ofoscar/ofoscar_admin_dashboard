import Link from 'next/link';

export default function AdminPage() {
  return (
    <main>
      <div className='flex flex-col'>
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
