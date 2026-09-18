import { authFetch } from '@/lib/auth-fetch';
import { notFound } from 'next/navigation';
import { deleteProject } from '../../../../actions/projects';

type ProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;

  const response = await authFetch(`/projects/${id}`);

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error('Failed to fetch project');
  }

  const project = await response.json();

  const deleteProjectWithId = deleteProject.bind(null, Number(id));

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex flex-col gap-2'>
        <h1>{project.title}</h1>
        <p>ID: {id}</p>
        <p>Description: {project.description}</p>
        <p>Github url: {project?.github_url}</p>
        <p>Demo url: {project?.demo_url}</p>
        <div className='flex flex-col gap-1'>
          <p>Tags:</p>
          {project?.tags.map((tag: string) => (
            <div key={tag}>{tag}</div>
          ))}
        </div>
        <p>Published: {project.published ? 'Published' : 'Draft'}</p>
      </div>
      <form action={deleteProjectWithId}>
        <button type='submit' className='border p-1 rounded-xl cursor-pointer'>
          Delete project
        </button>
      </form>
    </div>
  );
}
