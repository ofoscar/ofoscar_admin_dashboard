'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { login, type LoginState } from '../../actions/auth';

const initialState: LoginState = {};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      disabled={pending}
      className='w-full rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity disabled:opacity-50'
    >
      {pending ? 'Signing in...' : 'Sign in'}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState(login, initialState);

  return (
    <form action={formAction} className='flex flex-col gap-4'>
      <div className='flex flex-col gap-1.5'>
        <label htmlFor='email' className='text-sm font-medium'>
          Email
        </label>
        <input
          id='email'
          name='email'
          type='email'
          autoComplete='email'
          required
          className='rounded-md border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-foreground/50 dark:border-white/15'
        />
      </div>

      <div className='flex flex-col gap-1.5'>
        <label htmlFor='password' className='text-sm font-medium'>
          Password
        </label>
        <input
          id='password'
          name='password'
          type='password'
          autoComplete='current-password'
          required
          minLength={8}
          className='rounded-md border border-black/10 bg-transparent px-3 py-2 text-sm outline-none focus:border-foreground/50 dark:border-white/15'
        />
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
