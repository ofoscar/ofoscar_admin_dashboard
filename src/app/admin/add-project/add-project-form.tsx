'use client';

import { createProject, type CreateProjectState } from '@/actions/projects';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

const initialState: CreateProjectState = {};

const inputClassName =
  'rounded-md border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-foreground/50 dark:border-white/15';

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      disabled={pending}
      className='w-full rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity disabled:opacity-50'
    >
      {pending ? 'Creating...' : 'Create Project'}
    </button>
  );
}

export function AddProjectForm() {
  const [state, formAction] = useActionState(createProject, initialState);

  return (
    <form action={formAction} className='flex flex-col gap-4'>
      <div className='flex flex-col gap-1.5'>
        <label htmlFor='title' className='text-sm font-medium'>
          Title
        </label>
        <input
          id='title'
          name='title'
          type='text'
          required
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
          className={inputClassName}
        />
      </div>

      <div className='flex flex-col gap-1.5'>
        <label htmlFor='cover_image_url' className='text-sm font-medium'>
          Cover Image URL
        </label>
        <input
          id='cover_image_url'
          name='cover_image_url'
          type='url'
          className={inputClassName}
        />
      </div>

      <div className='flex flex-col gap-1.5'>
        <label htmlFor='tags' className='text-sm font-medium'>
          Tags (comma-separated)
        </label>
        <input
          id='tags'
          name='tags'
          type='text'
          placeholder='nextjs, typescript, fastapi'
          className={inputClassName}
        />
      </div>

      <div className='flex flex-col gap-1.5'>
        <label htmlFor='highlights' className='text-sm font-medium'>
          Highlights (comma-separated)
        </label>
        <input
          id='highlights'
          name='highlights'
          type='text'
          placeholder='Built X, Improved Y'
          className={inputClassName}
        />
      </div>

      <div className='flex items-center gap-2'>
        <input
          id='published'
          name='published'
          type='checkbox'
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
