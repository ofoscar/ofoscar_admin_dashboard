import { authFetch } from '@/lib/auth-fetch';

type ProjectImage = {
  id: number;
  image_url: string;
  description: string;
};

export type Project = {
  id: number;
  title: string;
  description: string;
  cover_image_url?: string | null;
  github_url?: string | null;
  demo_url?: string | null;
  tags: string[];
  highlights: string[];
  published: boolean;
  images: ProjectImage[];
};

export async function getProjects(): Promise<Project[]> {
  const response = await authFetch('/projects');

  if (!response.ok) {
    throw new Error('Failed to fetch projects');
  }

  return response.json();
}
