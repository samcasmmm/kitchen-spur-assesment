'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { ArrowUpRight, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { isAxiosError } from 'axios';
import { useSignIn } from '@/hooks/useAuthQueries';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showBalance, setShowBalance] = useState(true);

  const { mutate: signIn, isPending, error: serverError } = useSignIn();

  const getErrorMessage = () => {
    if (!serverError) return '';
    if (isAxiosError(serverError)) {
      const data = serverError.response?.data as { message?: string } | undefined;
      if (data?.message) return data.message;
      if (serverError.response?.status === 401) {
        return 'Invalid credentials. Please check your email and password.';
      }
      if (!serverError.response || serverError.code === 'ERR_NETWORK') {
        return 'Unable to connect to the server. Please verify your connection.';
      }
    }
    return 'Invalid credentials. Please check your email and password.';
  };

  const [form, setForm] = useState({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@resto.dev',
    password: 'admin@resto.dev',
  });

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
  }>({});

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  }

  function validate() {
    const newErrors: typeof errors = {};

    if (isSignUp) {
      if (!form.firstName.trim()) newErrors.firstName = 'First name required';
      if (!form.lastName.trim()) newErrors.lastName = 'Last name required';
    }

    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Min 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    signIn({
      email: form.email,
      password: form.password,
    });
  };

  const handleFillDemoAdmin = () => {
    setForm({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@resto.dev',
      password: 'admin@resto.dev',
    });
    setIsSignUp(false);
  };

  return (
    <div className='min-h-screen w-full flex flex-col lg:flex-row bg-[#0b0c10] text-zinc-100 font-sans'>
      {/* ========================================================================= */}
      {/* LEFT PANEL - Visual Showcase & Restaurant System Highlights */}
      {/* ========================================================================= */}
      <section className='relative lg:w-1/2 min-h-[560px] lg:min-h-screen bg-[#111317] p-8 sm:p-12 lg:p-16 flex flex-col justify-between overflow-hidden border-b lg:border-b-0 lg:border-r border-zinc-800/80 selection:bg-white selection:text-zinc-950'>
        {/* Subtle background glow & dot grid */}
        <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(59,130,246,0.18),rgba(255,255,255,0))]' />
        <div
          className='pointer-events-none absolute inset-0 opacity-[0.03]'
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Top Header Step Indicator */}
        <div className='relative z-10 flex items-center justify-between'>
          <span className='font-mono text-xs sm:text-sm tracking-widest text-zinc-400 font-medium'>
            01/03
          </span>
          <span className='text-[11px] font-semibold tracking-wider text-blue-400 uppercase bg-blue-950/60 border border-blue-800/50 px-3 py-1 rounded-full'>
            Resto Analytics v1.0
          </span>
        </div>

        {/* Floating 3D Cards Display */}
        <div className='relative z-10 my-auto py-10 sm:py-14 flex items-center justify-center'>
          <div className='relative w-[280px] sm:w-[320px] h-[360px] sm:h-[390px] select-none'>
            {/* BACK CARD - Frosted Mint/Teal Secondary Branch Card */}
            <div
              className='absolute -left-10 sm:-left-14 top-4 w-[235px] sm:w-[265px] h-[320px] sm:h-[355px] rounded-2xl p-6 flex flex-col justify-between transition-transform duration-700 ease-out hover:scale-105'
              style={{
                transform: 'rotate(-16deg) translate(-20px, 10px)',
                background:
                  'linear-gradient(145deg, rgba(206, 235, 230, 0.85) 0%, rgba(182, 222, 214, 0.7) 50%, rgba(150, 205, 196, 0.6) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow:
                  '0 25px 50px -12px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.3) inset',
              }}
            >
              <div>
                {/* Branch Flag / India Tricolor Badge */}
                <div className='w-8 h-5 rounded-full overflow-hidden border border-black/10 shadow-sm flex flex-col bg-white'>
                  <div className='h-1/3 w-full bg-[#FF9933]' />
                  <div className='h-1/3 w-full bg-white relative flex items-center justify-center'>
                    <div className='w-1.5 h-1.5 rounded-full border border-[#000080] flex items-center justify-center'>
                      <div className='w-0.5 h-0.5 rounded-full bg-[#000080]' />
                    </div>
                  </div>
                  <div className='h-1/3 w-full bg-[#138808]' />
                </div>

                <p className='mt-4 text-[11px] text-zinc-700/80 font-medium tracking-wide'>
                  Branch #02 • Kitchen Express
                </p>
                <div className='flex items-center gap-2 mt-0.5 text-zinc-800 font-mono text-xs tracking-wider'>
                  <span>**** **** **** 9568</span>
                </div>
              </div>

              {/* Watermark "RESTO" typography */}
              <div className='w-full overflow-hidden opacity-30 select-none pointer-events-none'>
                <div className='font-black italic text-5xl sm:text-6xl tracking-tighter text-zinc-800 -rotate-3'>
                  RESTO
                </div>
              </div>
            </div>

            {/* FRONT CARD - Matte Dark Carbon Indian / Main Branch Card */}
            <div
              className='absolute right-0 top-0 w-[240px] sm:w-[270px] h-[330px] sm:h-[365px] rounded-2xl p-6 flex flex-col justify-between z-20 text-white transition-transform duration-700 ease-out hover:scale-105'
              style={{
                transform: 'rotate(-7deg) translate(10px, -5px)',
                background:
                  'linear-gradient(145deg, #2b2e36 0%, #1f2127 45%, #15161a 100%)',
                boxShadow:
                  '0 35px 60px -15px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.12) inset',
              }}
            >
              <div>
                {/* Indian Flag Badge */}
                <div className='w-8 h-5 rounded-full overflow-hidden border border-white/20 shadow-sm flex flex-col'>
                  <div className='h-1/3 w-full bg-[#FF9933]' />
                  <div className='h-1/3 w-full bg-white relative flex items-center justify-center'>
                    <div className='w-1.5 h-1.5 rounded-full border border-[#000080] flex items-center justify-center'>
                      <div className='w-0.5 h-0.5 rounded-full bg-[#000080]' />
                    </div>
                  </div>
                  <div className='h-1/3 w-full bg-[#138808]' />
                </div>

                <p className='mt-4 text-[11px] text-zinc-400 font-medium tracking-wide'>
                  Main Outlet • Daily Revenue
                </p>
                <div className='flex items-center justify-between mt-0.5'>
                  <span className='font-mono text-xs sm:text-sm tracking-wider text-zinc-200'>
                    **** **** **** 9568
                  </span>
                  <button
                    type='button'
                    className='text-zinc-400 hover:text-zinc-200 transition-colors'
                  >
                    <EyeOff className='w-3.5 h-3.5' />
                  </button>
                </div>
              </div>

              {/* Stylized "RESTO" in Bold Geometric Typography */}
              <div className='my-auto select-none pointer-events-none'>
                <div
                  className='font-black italic text-5xl sm:text-6xl tracking-tighter text-white drop-shadow-md'
                  style={{
                    fontFamily:
                      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    letterSpacing: '-0.06em',
                  }}
                >
                  RESTO
                </div>
              </div>

              {/* Bottom Balance & Eye Action */}
              <div className='flex items-center justify-between pt-2 border-t border-white/10'>
                <div>
                  <p className='text-[10px] text-zinc-400 font-medium uppercase tracking-wider'>
                    Total Gross Sales
                  </p>
                  <span className='text-xs sm:text-sm font-semibold tracking-tight text-white font-mono'>
                    {showBalance ? '₹ 48,23,812' : '₹ ••••••••••'}
                  </span>
                </div>
                <button
                  type='button'
                  onClick={() => setShowBalance(!showBalance)}
                  className='text-zinc-400 hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/5'
                  title='Toggle balance'
                >
                  <Eye className='w-4 h-4' />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Hero Section - Clean Minimalist Layout */}
        <div className='relative z-10 max-w-md'>
          <div className='flex items-center gap-3'>
            <h2 className='text-3xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-none'>
              Restaurant Analytics
            </h2>
            <div className='inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-zinc-800/90 border border-zinc-700 text-white shadow-inner'>
              <ArrowUpRight className='w-4 h-4 sm:w-5 sm:h-5' />
            </div>
          </div>
          <h2 className='text-3xl sm:text-4xl lg:text-[40px] font-bold text-white tracking-tight leading-tight mt-1'>
            & Management System
          </h2>
          <p className='mt-3.5 text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal'>
            A high-performance, full-stack application designed for restaurant
            owners to monitor performance, manage locations, and analyze sales
            data in real-time.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* RIGHT PANEL - Clean Modern White Form */}
      {/* ========================================================================= */}
      <section className='lg:w-1/2 min-h-screen bg-white text-zinc-900 flex flex-col justify-center items-center px-6 sm:px-12 lg:px-16 py-12 selection:bg-zinc-900 selection:text-white'>
        <div className='w-full max-w-[420px] mx-auto'>
          {/* Logo & Brand Name */}
          <div className='flex items-center justify-center gap-2.5 mb-6'>
            <div className='w-9 h-9 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow-sm shadow-blue-500/30'>
              <span className='font-black text-sm tracking-tighter'>RA</span>
            </div>
            <div className='flex flex-col'>
              <span className='font-bold text-lg tracking-tight text-[#0F294A] leading-tight'>
                RestoAnalytics
              </span>
              <span className='text-[10px] text-zinc-400 font-medium'>
                Management System
              </span>
            </div>
          </div>

          {/* Heading Greetings */}
          <div className='text-center mb-6'>
            <p className='text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight'>
              Hi! Welcome to
            </p>
            <div className='flex items-center justify-center gap-2 mt-1'>
              <h1 className='text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight'>
                RestoAnalytics dude
              </h1>
              <span className='text-2xl select-none'>👋</span>
            </div>
            <p className='text-xs text-zinc-500 mt-1.5'>
              Sign in to manage branches, track orders & view live sales data
            </p>
          </div>

          {/* Quick Demo Fill Helper */}
          <div className='mb-5 p-3 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-between text-xs text-blue-900'>
            <span>
              Credentials: <strong>admin@resto.dev</strong>
            </span>
            <button
              type='button'
              onClick={handleFillDemoAdmin}
              className='font-semibold text-blue-600 hover:text-blue-800 underline ml-2 transition-colors'
            >
              Auto-fill Admin
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleFormSubmit} className='space-y-4'>
            {/* First Name & Last Name (Visible when in Sign Up mode) */}
            {isSignUp && (
              <div className='grid grid-cols-2 gap-3'>
                <div>
                  <label
                    htmlFor='firstName'
                    className='block text-xs font-semibold text-zinc-700 mb-1.5'
                  >
                    First Name
                  </label>
                  <input
                    id='firstName'
                    name='firstName'
                    type='text'
                    value={form.firstName}
                    onChange={handleInputChange}
                    placeholder='John'
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-zinc-900 placeholder:text-zinc-400 bg-white transition-all outline-none ${
                      errors.firstName
                        ? 'border-red-400 ring-2 ring-red-100'
                        : 'border-zinc-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                    }`}
                  />
                  {errors.firstName && (
                    <p className='text-red-500 text-[11px] mt-1'>
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor='lastName'
                    className='block text-xs font-semibold text-zinc-700 mb-1.5'
                  >
                    Last Name
                  </label>
                  <input
                    id='lastName'
                    name='lastName'
                    type='text'
                    value={form.lastName}
                    onChange={handleInputChange}
                    placeholder='Doe'
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-zinc-900 placeholder:text-zinc-400 bg-white transition-all outline-none ${
                      errors.lastName
                        ? 'border-red-400 ring-2 ring-red-100'
                        : 'border-zinc-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                    }`}
                  />
                  {errors.lastName && (
                    <p className='text-red-500 text-[11px] mt-1'>
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Email Field */}
            <div>
              <label
                htmlFor='email'
                className='block text-xs font-semibold text-zinc-700 mb-1.5'
              >
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                value={form.email}
                onChange={handleInputChange}
                placeholder='admin@resto.dev'
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm text-zinc-900 placeholder:text-zinc-400 bg-white transition-all outline-none ${
                  errors.email
                    ? 'border-red-400 ring-2 ring-red-100'
                    : 'border-zinc-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                }`}
              />
              {errors.email && (
                <p className='text-red-500 text-[11px] mt-1'>{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor='password'
                className='block text-xs font-semibold text-zinc-700 mb-1.5'
              >
                Password
              </label>
              <div className='relative'>
                <input
                  id='password'
                  name='password'
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={handleInputChange}
                  placeholder='*********'
                  className={`w-full px-3.5 py-2.5 pr-10 rounded-xl border text-sm text-zinc-900 placeholder:text-zinc-400 bg-white transition-all outline-none ${
                    errors.password
                      ? 'border-red-400 ring-2 ring-red-100'
                      : 'border-zinc-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100'
                  }`}
                />
                <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors'
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className='w-4 h-4' />
                  ) : (
                    <Eye className='w-4 h-4' />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className='text-red-500 text-[11px] mt-1'>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Server Error Message */}
            {serverError && (
              <div className='p-3 rounded-xl bg-red-50/90 border border-red-200 text-red-700 text-xs flex items-center gap-2.5'>
                <AlertCircle className='w-4 h-4 shrink-0 text-red-500' />
                <span>{getErrorMessage()}</span>
              </div>
            )}

            {/* Primary Action Button */}
            <button
              type='submit'
              disabled={isPending}
              className='w-full mt-2 py-3 px-4 rounded-xl font-semibold text-sm text-white bg-[#1877F2] hover:bg-[#1569d6] active:scale-[0.99] transition-all shadow-md shadow-blue-500/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2'
            >
              {isPending && <Loader2 className='w-4 h-4 animate-spin' />}
              {isPending
                ? isSignUp
                  ? 'Signing up...'
                  : 'Signing in...'
                : isSignUp
                  ? 'Sign up'
                  : 'Sign In'}
            </button>
          </form>

          {/* Switch Mode Link */}
          <div className='text-center mt-5 text-xs text-zinc-500'>
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <button
                  type='button'
                  onClick={() => setIsSignUp(false)}
                  className='font-semibold text-zinc-900 underline hover:text-blue-600 transition-colors ml-1'
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{' '}
                <button
                  type='button'
                  onClick={() => setIsSignUp(true)}
                  className='font-semibold text-zinc-900 underline hover:text-blue-600 transition-colors ml-1'
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Divider */}
          <div className='relative my-6 text-center'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-zinc-200' />
            </div>
            <span className='relative bg-white px-3 text-xs text-zinc-400 font-medium'>
              Or with email
            </span>
          </div>

          {/* Social Sign Up / Sign In Buttons */}
          <div className='grid grid-cols-2 gap-3'>
            {/* Google */}
            <button
              type='button'
              className='flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 text-xs font-semibold text-zinc-700 transition-all shadow-2xs'
            >
              <svg className='w-4 h-4 shrink-0' viewBox='0 0 24 24'>
                <path
                  fill='#4285F4'
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                />
                <path
                  fill='#34A853'
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                />
                <path
                  fill='#FBBC05'
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z'
                />
                <path
                  fill='#EA4335'
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z'
                />
              </svg>
              <span>{isSignUp ? 'Sign up with Google' : 'Sign in with Google'}</span>
            </button>

            {/* Apple */}
            <button
              type='button'
              className='flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border border-zinc-200 hover:bg-zinc-50 hover:border-zinc-300 text-xs font-semibold text-zinc-700 transition-all shadow-2xs'
            >
              <svg className='w-4 h-4 shrink-0 fill-current' viewBox='0 0 24 24'>
                <path d='M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.36c.64-.78 1.08-1.86.96-2.95-1 .04-2.16.67-2.85 1.46-.57.65-1.07 1.73-.93 2.8 1.11.09 2.19-.57 2.82-1.31z' />
              </svg>
              <span>{isSignUp ? 'Sign up with Apple' : 'Sign in with Apple'}</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
