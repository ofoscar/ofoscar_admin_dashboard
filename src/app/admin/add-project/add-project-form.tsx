'use client';

import { createProject, type CreateProjectState } from '@/actions/projects';
import { uploadImage } from '@/actions/uploads';
import { useActionState, useState, useTransition } from 'react';
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

function CoverImageField() {
  const [isUploading, startTransition] = useTransition();
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError('');

    startTransition(async () => {
      const formData = new FormData();
      formData.set('file', file);

      const result = await uploadImage({}, formData);

      if (result.error) {
        setError(result.error);
        setUrl('');
        return;
      }

      setUrl(result.url ?? '');
    });
  };

  return (
    <div className='flex flex-col gap-1.5'>
      <label htmlFor='cover_image' className='text-sm font-medium'>
        Cover Image
      </label>

      <input type='hidden' name='cover_image_url' value={url} />

      <input
        id='cover_image'
        type='file'
        accept='image/jpeg,image/png,image/webp'
        disabled={isUploading}
        onChange={handleFileChange}
        className={inputClassName}
      />

      {isUploading && (
        <p className='text-sm text-foreground/60'>Uploading...</p>
      )}

      {error && (
        <p role='alert' className='text-sm text-red-600 dark:text-red-400'>
          {error}
        </p>
      )}

      {url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={url}
          alt='Cover preview'
          className='h-32 w-auto rounded-md border border-black/10 object-cover dark:border-white/15'
        />
      )}
    </div>
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

      <CoverImageField />

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
