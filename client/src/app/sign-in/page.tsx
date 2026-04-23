'use client';

import { Button } from '@/components/ui/button';
import { FormField } from '@/components/ui/form-field';
import { useSignIn } from '@/hooks/useAuthQueries';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function SignIn() {
  const { mutate: signIn, isPending, error: serverError } = useSignIn();

  const [form, setForm] = useState({
    email: 'admin@resto.dev',
    password: 'admin@resto.dev',
  });

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  function validateCred() {
    const newErrors: typeof errors = {};

    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Minimum 6 characters required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateCred()) return;

    signIn(form);
  };

  return (
    <div className='relative min-h-screen flex items-center justify-center bg-zinc-950 px-6'>
      <div className='w-full max-w-sm space-y-8'>
        <h1 className='text-2xl text-center text-white'>Welcome Back</h1>

        <form onSubmit={handleFormSubmit} className='space-y-5'>
          <div>
            <FormField
              id='email'
              label='Email Address'
              inputProps={{
                name: 'email',
                type: 'email',
                value: form.email,
                onChange: handleInputChange,
                placeholder: 'name@company.com',
              }}
            />
            {errors.email && (
              <p className='text-red-500 text-xs mt-1'>{errors.email}</p>
            )}
          </div>

          <div>
            <FormField
              id='password'
              label='Password'
              inputProps={{
                name: 'password',
                type: 'password',
                value: form.password,
                onChange: handleInputChange,
                placeholder: '••••••••',
              }}
            />
            {errors.password && (
              <p className='text-red-500 text-xs mt-1'>{errors.password}</p>
            )}
          </div>

          {serverError && (
            <p className='text-red-500 text-xs'>Invalid email or password</p>
          )}

          <Button
            type='submit'
            disabled={isPending}
            className='w-full h-11 bg-zinc-100 text-zinc-950'
          >
            {isPending ? 'Signing In...' : 'Sign In'}
          </Button>
        </form>
      </div>
    </div>
  );
}
