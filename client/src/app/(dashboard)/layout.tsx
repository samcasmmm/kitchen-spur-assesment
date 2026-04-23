'use client';

import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import { useAuth } from '@/stores/use-auth-store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuth) {
      router.replace('/sign-in');
    }
  }, [isAuth, router]);

  if (!isAuth) {
    return <DashboardSkeleton />;
  }

  return (
    <div className='relative min-h-screen bg-zinc-950  overflow-hidden'>
      <Navbar />
      <main className='flex-1 container mx-auto px-4 py-6'>{children}</main>
      <Footer />
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50'>
      <div className='animate-pulse flex flex-col items-center'>
        <div className='h-12 w-12 rounded-full bg-gray-200 mb-4' />
        <div className='h-4 w-24 bg-gray-200 rounded' />
      </div>
    </div>
  );
}
