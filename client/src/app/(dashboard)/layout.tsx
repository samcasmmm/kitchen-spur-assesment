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
    <div className='relative min-h-screen bg-[#0b0c10] overflow-hidden selection:bg-white selection:text-zinc-950'>
      <Navbar />
      <div className='flex-1 pt-16'>{children}</div>
      <Footer />
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-[#0b0c10] text-zinc-100 selection:bg-white selection:text-zinc-950'>
      <div className='flex flex-col items-center gap-3'>
        <div className='w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-sm shadow-[0_0_25px_rgba(37,99,235,0.5)] animate-pulse'>
          RA
        </div>
        <div className='flex items-center gap-2 mt-2'>
          <span className='w-2 h-2 rounded-full bg-blue-500 animate-ping' />
          <span className='text-xs font-mono text-zinc-400 tracking-wider uppercase'>
            Synchronizing Workspace…
          </span>
        </div>
      </div>
    </div>
  );
}
