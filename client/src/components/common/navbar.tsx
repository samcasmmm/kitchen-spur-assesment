'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Menu, X, BarChart3, ChefHat } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useSignOut } from '@/hooks/useAuthQueries';
import RestoAnalyticLogo from './resto-logo';

const Navbar = () => {
  const pathname = usePathname();
  const { mutate: signOut, isPending } = useSignOut();

  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: BarChart3,
    },
    {
      path: '/restaurants',
      label: 'Restaurants',
      icon: ChefHat,
    },
  ];

  const isPathActive = (path: string) => pathname === path;

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-zinc-950/80 backdrop-blur-md'>
      <div className='mx-auto max-w-7xl px-6 h-16 flex items-center justify-between'>
        <RestoAnalyticLogo />

        <div className='hidden md:flex items-center gap-8'>
          <div className='flex items-center gap-1'>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isPathActive(item.path);

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    'relative px-4 py-2 text-xs font-medium transition-colors duration-200 flex items-center gap-2',
                    active ? 'text-white' : 'text-zinc-500 hover:text-zinc-300',
                  )}
                >
                  <Icon
                    className={cn(
                      'h-3.5 w-3.5 transition-colors',
                      active ? 'text-white' : 'text-zinc-500',
                    )}
                  />
                  {item.label}

                  <span
                    className={cn(
                      'absolute inset-x-4 bottom-[-1.2rem] h-px bg-white origin-center transition-all duration-300',
                      active
                        ? 'scale-x-100 opacity-100'
                        : 'scale-x-0 opacity-0',
                    )}
                  />
                </Link>
              );
            })}
          </div>

          <Separator orientation='vertical' className='h-4 bg-zinc-800' />

          <Button
            variant='ghost'
            onClick={handleLogout}
            disabled={isPending}
            className='group h-8 px-3 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all'
          >
            <LogOut className='mr-2 h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5' />
            {isPending ? 'Signing out...' : 'Sign Out'}
          </Button>
        </div>

        <button
          className='md:hidden text-zinc-400'
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className='md:hidden border-b border-zinc-900 bg-zinc-950 px-6 py-8 space-y-6 animate-in slide-in-from-top-4'>
          <div className='flex flex-col gap-4'>
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-4 text-sm font-light transition-colors',
                    isPathActive(item.path)
                      ? 'text-white'
                      : 'text-zinc-500 hover:text-zinc-300',
                  )}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <Separator className='bg-zinc-900' />

          <Button
            variant='ghost'
            className='w-full justify-start px-0 text-red-400 hover:text-red-300 hover:bg-transparent'
            onClick={() => {
              setMobileOpen(false);
              handleLogout();
            }}
          >
            <LogOut className='mr-3 h-4 w-4' />
            {isPending ? 'Logging out...' : 'Logout'}
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
