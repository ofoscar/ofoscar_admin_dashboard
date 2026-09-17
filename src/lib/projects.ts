import { authFetch } from '@/lib/auth-fetch';

export type Project = {
  id: number;
  title: string;
  description: string;
  cover_image_url?: string | null;
  github_url?: string | null;
  demo_url?: string | null;
  tags: string[];
  published: boolean;
};

export async function getProjects(): Promise<Project[]> {
  const response = await authFetch('/projects');

  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }

  return response.json();
}
