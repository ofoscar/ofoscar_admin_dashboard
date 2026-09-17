'use server';

import { redirect } from 'next/navigation';

import { authFetch } from '@/lib/auth-fetch';

export async function deleteProject(projectId: number) {
  const path = `/projects/${projectId}`;

  const response = await authFetch(path, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const body = await response.text();

    throw new Error(`Failed to delete project: ${response.status} ${body}`);
  }

  redirect('/admin/projects');
}
