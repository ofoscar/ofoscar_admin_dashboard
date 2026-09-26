import Link from 'next/link';
import ProjectsList from './components/projects-list';

export default function ProjectsPage() {
  return (
    <div className='flex flex-1 flex-row justify-between'>
      <ProjectsList />
      <div className='border p-1 rounded-md bg-blue-700'>
        <Link href='/admin/add-project'>Add Project</Link>
      </div>
    </div>
  );
}
