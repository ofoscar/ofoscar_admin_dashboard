import { authFetch } from '@/lib/auth-fetch';
import type { Project } from '@/lib/projects';
import { notFound } from 'next/navigation';
import { EditProjectForm } from './edit-project-form';

type EditProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;

  const response = await authFetch(`/projects/${id}`);

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error('Failed to fetch project');
  }

  const project: Project = await response.json();

  return (
    <main className='mx-auto max-w-lg p-6'>
      <h1 className='mb-4 text-lg font-semibold'>Edit Project</h1>
      <EditProjectForm project={project} />
    </main>
  );
}
