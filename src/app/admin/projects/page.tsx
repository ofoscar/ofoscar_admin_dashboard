import Link from 'next/link';
import ProjectsList from './components/projects-list';

export default function ProjectsPage() {
  return (
    <main>
      <div className='flex flex-1 flex-row justify-between border'>
        <ProjectsList />
        <div>
          <Link href='/admin/add-project'>Add Project</Link>
        </div>
      </div>
    </main>
  );
}
