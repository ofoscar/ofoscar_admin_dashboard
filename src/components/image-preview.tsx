'use client';

import { useRef } from 'react';

export default function ImagePreview({
  src,
  alt,
  thumbnailClassName,
}: {
  src: string;
  alt: string;
  thumbnailClassName: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type='button'
        onClick={() => dialogRef.current?.showModal()}
        className='cursor-pointer'
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} className={thumbnailClassName} />
      </button>

      <dialog
        ref={dialogRef}
        onClick={(event) => {
          if (event.target === dialogRef.current) {
            dialogRef.current?.close();
          }
        }}
        onClose={(event) => event.stopPropagation()}
        className='fixed top-1/2 left-1/2 m-0 max-h-[90vh] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-foreground/10 bg-background p-2 text-foreground shadow-lg backdrop:bg-black/60'
      >
        <button
          type='button'
          onClick={() => dialogRef.current?.close()}
          aria-label='Close preview'
          className='absolute top-2 right-2 flex size-8 cursor-pointer items-center justify-center rounded-full border border-foreground/15 bg-background hover:bg-foreground/10'
        >
          ✕
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className='max-h-[85vh] max-w-[85vw] object-contain'
        />
      </dialog>
    </>
  );
}
