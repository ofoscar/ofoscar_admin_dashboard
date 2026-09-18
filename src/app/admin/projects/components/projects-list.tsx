import { getProjects } from '@/lib/projects';
import Link from 'next/link';

export default async function ProjectsList() {
  const projects = await getProjects();
  return (
    <div className='flex flex-col gap-1'>
      {projects.map((project) => (
        <Link key={project.id} href={`/admin/projects/${project.id}`}>
          {project.title}
        </Link>
      ))}
    </div>
  );
}
