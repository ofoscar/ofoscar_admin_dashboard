'use client';

import { uploadImage } from '@/actions/uploads';
import { inputClassName } from '@/components/form-styles';
import { useState, useTransition } from 'react';

export type ProjectImageItem = {
  id: string;
  url: string;
  description: string;
};

type ProjectImagesFieldProps = {
  initialImages?: ProjectImageItem[];
};

export function ProjectImagesField({
  initialImages = [],
}: ProjectImagesFieldProps) {
  const [isUploading, startTransition] = useTransition();
  const [images, setImages] = useState<ProjectImageItem[]>(initialImages);
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
        return;
      }

      setImages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), url: result.url ?? '', description: '' },
      ]);
    });

    event.target.value = '';
  };

  const updateDescription = (id: string, description: string) => {
    setImages((prev) =>
      prev.map((image) => (image.id === id ? { ...image, description } : image)),
    );
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
  };

  const imagesPayload = JSON.stringify(
    images.map(({ url, description }) => ({
      image_url: url,
      description,
    })),
  );

  return (
    <div className='flex flex-col gap-1.5'>
      <label htmlFor='project_images' className='text-sm font-medium'>
        Project Images
      </label>

      <input type='hidden' name='images' value={imagesPayload} />

      <input
        id='project_images'
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

      {images.length > 0 && (
        <div className='flex flex-col gap-3'>
          {images.map((image) => (
            <div
              key={image.id}
              className='flex items-start gap-3 rounded-md border border-black/10 p-2 dark:border-white/15'
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={image.url}
                alt='Project preview'
                className='h-20 w-20 rounded-md object-cover'
              />

              <div className='flex flex-1 flex-col gap-1.5'>
                <input
                  type='text'
                  value={image.description}
                  onChange={(event) =>
                    updateDescription(image.id, event.target.value)
                  }
                  placeholder='Description'
                  className={inputClassName}
                />
              </div>

              <button
                type='button'
                onClick={() => removeImage(image.id)}
                className='text-sm text-red-600 dark:text-red-400'
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
