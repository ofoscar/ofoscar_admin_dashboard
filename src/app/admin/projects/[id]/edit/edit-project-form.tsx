'use client';

import { updateProject, type UpdateProjectState } from '@/actions/projects';
import { CoverImageField } from '@/components/cover-image-field';
import { inputClassName } from '@/components/form-styles';
import {
  ProjectImagesField,
  type ProjectImageItem,
} from '@/components/project-images-field';
import { toProjectSnapshot, type Project } from '@/lib/project-types';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

const initialState: UpdateProjectState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      disabled={pending}
      className='w-full rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity disabled:opacity-50'
    >
      {pending ? 'Saving...' : 'Save Changes'}
    </button>
  );
}

type EditProjectFormProps = {
  project: Project;
};

export function EditProjectForm({ project }: EditProjectFormProps) {
  const updateProjectWithId = updateProject.bind(null, project.id);
  const [state, formAction] = useActionState(
    updateProjectWithId,
    initialState,
  );

  const originalSnapshot = JSON.stringify(toProjectSnapshot(project));

  const initialImages: ProjectImageItem[] = project.images.map((image) => ({
    id: String(image.id),
    url: image.image_url,
    description: image.description,
  }));

  return (
    <form action={formAction} className='flex flex-col gap-4'>
      <input type='hidden' name='original' value={originalSnapshot} />

      <div className='flex flex-col gap-1.5'>
        <label htmlFor='title' className='text-sm font-medium'>
          Title
        </label>
        <input
          id='title'
          name='title'
          type='text'
          required
          defaultValue={project.title}
          className={inputClassName}
        />
      </div>

      <div className='flex flex-col gap-1.5'>
        <label htmlFor='description' className='text-sm font-medium'>
          Description
        </label>
        <textarea
          id='description'
          name='description'
          required
          rows={4}
          defaultValue={project.description}
          className={inputClassName}
        />
      </div>

      <div className='flex flex-col gap-1.5'>
        <label htmlFor='github_url' className='text-sm font-medium'>
          GitHub URL
        </label>
        <input
          id='github_url'
          name='github_url'
          type='url'
          defaultValue={project.github_url ?? ''}
          className={inputClassName}
        />
      </div>

      <div className='flex flex-col gap-1.5'>
        <label htmlFor='demo_url' className='text-sm font-medium'>
          Demo URL
        </label>
        <input
          id='demo_url'
          name='demo_url'
          type='url'
          defaultValue={project.demo_url ?? ''}
          className={inputClassName}
        />
      </div>

      <CoverImageField initialUrl={project.cover_image_url ?? ''} />

      <ProjectImagesField initialImages={initialImages} />

      <div className='flex flex-col gap-1.5'>
        <label htmlFor='tags' className='text-sm font-medium'>
          Tags (comma-separated)
        </label>
        <input
          id='tags'
          name='tags'
          type='text'
          placeholder='nextjs, typescript, fastapi'
          defaultValue={project.tags.join(', ')}
          className={inputClassName}
        />
      </div>

      <div className='flex items-center gap-2'>
        <input
          id='published'
          name='published'
          type='checkbox'
          defaultChecked={project.published}
          className='h-4 w-4 rounded border border-black/10 dark:border-white/15'
        />
        <label htmlFor='published' className='text-sm font-medium'>
          Published
        </label>
      </div>

      {state?.error && (
        <p role='alert' className='text-sm text-red-600 dark:text-red-400'>
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
