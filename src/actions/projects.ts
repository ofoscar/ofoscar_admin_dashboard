'use server';

import { redirect } from 'next/navigation';

import { authFetch } from '@/lib/auth-fetch';
import type { Project } from '@/lib/projects';

export type CreateProjectState = {
  error?: string;
};

export type UpdateProjectState = {
  error?: string;
};

const toOptionalString = (value: FormDataEntryValue | null) =>
  typeof value === 'string' && value.trim() ? value.trim() : null;

const toList = (value: FormDataEntryValue | null) =>
  typeof value === 'string'
    ? value
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    : [];

const toImages = (value: FormDataEntryValue | null) => {
  if (typeof value !== 'string' || !value.trim()) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter(
        (item): item is { image_url: string; description?: string } =>
          typeof item?.image_url === 'string' && item.image_url.trim() !== '',
      )
      .map((item) => ({
        image_url: item.image_url,
        description: item.description?.trim() || null,
      }));
  } catch {
    return [];
  }
};

const isEqual = (a: unknown, b: unknown) => JSON.stringify(a) === JSON.stringify(b);

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

  const body = {
    title: title.trim(),
    description: description.trim(),
    github_url: toOptionalString(formData.get('github_url')),
    demo_url: toOptionalString(formData.get('demo_url')),
    cover_image_url: toOptionalString(formData.get('cover_image_url')),
    published: formData.get('published') === 'on',
    tags: toList(formData.get('tags')),
    highlights: toList(formData.get('highlights')),
    images: toImages(formData.get('images')),
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

export async function updateProject(
  project: Project,
  _prevState: UpdateProjectState,
  formData: FormData,
): Promise<UpdateProjectState> {
  const title = formData.get('title');
  const description = formData.get('description');

  if (typeof title !== 'string' || !title.trim()) {
    return { error: 'Title is required.' };
  }

  if (typeof description !== 'string' || !description.trim()) {
    return { error: 'Description is required.' };
  }

  const next = {
    title: title.trim(),
    description: description.trim(),
    github_url: toOptionalString(formData.get('github_url')),
    demo_url: toOptionalString(formData.get('demo_url')),
    cover_image_url: toOptionalString(formData.get('cover_image_url')),
    published: formData.get('published') === 'on',
    tags: toList(formData.get('tags')),
    images: toImages(formData.get('images')),
  };

  const previous = {
    title: project.title,
    description: project.description,
    github_url: project.github_url ?? null,
    demo_url: project.demo_url ?? null,
    cover_image_url: project.cover_image_url ?? null,
    published: project.published,
    tags: project.tags,
    images: project.images.map((image) => ({
      image_url: image.image_url,
      description: image.description || null,
    })),
  };

  const body = Object.fromEntries(
    Object.entries(next).filter(
      ([key, value]) => !isEqual(value, previous[key as keyof typeof previous]),
    ),
  );

  if (Object.keys(body).length === 0) {
    redirect(`/admin/projects/${project.id}`);
  }

  const response = await authFetch(`/projects/${project.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const responseBody = await response.text();

    return {
      error: `Failed to update project: ${response.status} ${responseBody}`,
    };
  }

  redirect(`/admin/projects/${project.id}`);
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
