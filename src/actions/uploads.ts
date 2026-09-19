'use server';

import { authFetch } from '@/lib/auth-fetch';

export type UploadImageState = {
  url?: string;
  error?: string;
};

export async function uploadImage(
  _prevState: UploadImageState,
  formData: FormData,
): Promise<UploadImageState> {
  const file = formData.get('file');

  if (!(file instanceof File) || file.size === 0) {
    return { error: 'Please choose an image to upload.' };
  }

  const body = new FormData();
  body.set('file', file);

  const response = await authFetch('/uploads/images', {
    method: 'POST',
    body,
  });

  if (!response.ok) {
    const responseBody = await response.text();

    return {
      error: `Failed to upload image: ${response.status} ${responseBody}`,
    };
  }

  const data = (await response.json()) as { url: string };

  return { url: data.url };
}
