import { authFetch } from '@/lib/auth-fetch';
import type { Project } from '@/lib/project-types';

export type { Project, ProjectImage, ProjectSnapshot } from '@/lib/project-types';
export { toProjectSnapshot } from '@/lib/project-types';

export async function getProjects(): Promise<Project[]> {
  const response = await authFetch('/projects');

  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }

  return response.json();
}
