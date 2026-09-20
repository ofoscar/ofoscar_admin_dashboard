'use client';

import { uploadImage } from '@/actions/uploads';
import { inputClassName } from '@/components/form-styles';
import { useState, useTransition } from 'react';

type CoverImageFieldProps = {
  initialUrl?: string;
};

export function CoverImageField({ initialUrl = '' }: CoverImageFieldProps) {
  const [isUploading, startTransition] = useTransition();
  const [url, setUrl] = useState(initialUrl);
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
