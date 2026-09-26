'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';

import { logout } from '@/actions/auth';

function LogoutButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      disabled={pending}
      className='w-full cursor-pointer rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-foreground/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground disabled:cursor-wait disabled:opacity-50'
    >
      {pending ? 'Logging out…' : 'Log out'}
    </button>
  );
}

export default function AppBar({ email }: { email: string }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function dismissOutside(event: PointerEvent) {
      if (!menuRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function dismissOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    }

    document.addEventListener('pointerdown', dismissOutside);
    document.addEventListener('keydown', dismissOnEscape);
    return () => {
      document.removeEventListener('pointerdown', dismissOutside);
      document.removeEventListener('keydown', dismissOnEscape);
    };
  }, [open]);

  return (
    <header className='relative z-30 flex h-16 shrink-0 items-center justify-between border-b border-foreground/10 bg-background px-4 sm:px-6'>
      <Link
        href='/admin'
        className='rounded text-sm font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground'
      >
        ofos / admin
      </Link>

      <div
        ref={menuRef}
        className='relative'
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setOpen(false);
          }
        }}
      >
        <button
          ref={triggerRef}
          type='button'
          aria-label='User account'
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen(!open)}
          className='flex size-10 cursor-pointer items-center justify-center rounded-full border border-foreground/15 bg-foreground/5 transition-colors hover:bg-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground'
        >
          <svg
            aria-hidden='true'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.75'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='size-5'
          >
            <circle cx='12' cy='8' r='4' />
            <path d='M4 21v-2a8 8 0 0 1 16 0v2' />
          </svg>
        </button>

        <div
          id={menuId}
          hidden={!open}
          className='absolute right-0 top-full mt-2 w-72 max-w-[calc(100vw-2rem)] rounded-xl border border-foreground/10 bg-background p-2 shadow-lg'
        >
          <div className='border-b border-foreground/10 px-3 py-3'>
            <p className='text-xs text-foreground/60'>Signed in as</p>
            <p className='mt-1 break-all text-sm font-medium'>{email}</p>
          </div>
          <form action={logout} className='mt-2'>
            <LogoutButton />
          </form>
        </div>
      </div>
    </header>
  );
}
