'use server';

import { redirect } from 'next/navigation';

import { authFetch } from '@/lib/auth-fetch';

export type CreateProjectState = {
  error?: string;
};

export async function createProject(
  _prevState: CreateProjectState,
  formData: FormData,
): Promise<CreateProjectState> {
  const title = formData.get('title');
  const description = formData.get('description');

  if (typeof title !== 'string' || !title.trim()) {
    return { error: 'Title is required.' };
  }

  if (typeof description !== 'string' || !description.trim()) {
    return { error: 'Description is required.' };
  }

  const toOptionalString = (value: FormDataEntryValue | null) =>
    typeof value === 'string' && value.trim() ? value.trim() : null;

  const toList = (value: FormDataEntryValue | null) =>
    typeof value === 'string'
      ? value
          .split(',')
          .map((item) => item.trim())
          .filter(Boolean)
      : [];

  const body = {
    title: title.trim(),
    description: description.trim(),
    github_url: toOptionalString(formData.get('github_url')),
    demo_url: toOptionalString(formData.get('demo_url')),
    cover_image_url: toOptionalString(formData.get('cover_image_url')),
    published: formData.get('published') === 'on',
    tags: toList(formData.get('tags')),
    highlights: toList(formData.get('highlights')),
  };

  const response = await authFetch('/projects', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const responseBody = await response.text();

    return {
      error: `Failed to create project: ${response.status} ${responseBody}`,
    };
  }

  redirect('/admin/projects');
}

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
