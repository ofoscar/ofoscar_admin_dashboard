'use client';

import { useRef } from 'react';
import { useFormStatus } from 'react-dom';

function ConfirmButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      disabled={pending}
      className='cursor-pointer rounded-xl border border-red-600/30 bg-red-600 px-3 py-1 text-white transition-colors hover:bg-red-700 disabled:cursor-wait disabled:opacity-50'
    >
      {pending ? 'Deleting…' : 'Delete'}
    </button>
  );
}

export default function DeleteProjectButton({
  deleteAction,
}: {
  deleteAction: () => Promise<void>;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type='button'
        onClick={() => dialogRef.current?.showModal()}
        className='cursor-pointer rounded-xl border p-1'
      >
        Delete project
      </button>

      <dialog
        ref={dialogRef}
        onClose={(event) => event.stopPropagation()}
        className='fixed top-1/2 left-1/2 m-0 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-foreground/10 bg-background p-4 text-foreground shadow-lg backdrop:bg-black/40'
      >
        <p className='max-w-xs'>
          Are you sure you want to delete this project? This action cannot be
          undone.
        </p>
        <div className='mt-4 flex justify-end gap-2'>
          <button
            type='button'
            onClick={() => dialogRef.current?.close()}
            className='cursor-pointer rounded-xl border p-1'
          >
            Cancel
          </button>
          <form action={deleteAction}>
            <ConfirmButton />
          </form>
        </div>
      </dialog>
    </>
  );
}
