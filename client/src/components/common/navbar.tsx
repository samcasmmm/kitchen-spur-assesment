'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LogOut, Menu, X, BarChart3, ChefHat } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useSignOut } from '@/hooks/useAuthQueries';
import { useAuth } from '@/stores/use-auth-store';
import RestoAnalyticLogo from './resto-logo';

const Navbar = () => {
  const pathname = usePathname();
  const { mutate: signOut, isPending } = useSignOut();
  const { user } = useAuth();

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

  const isPathActive = (path: string) => {
    if (path === '/dashboard') return pathname === '/dashboard';
    if (path === '/restaurants') return pathname.startsWith('/restaurants');
    return pathname === path;
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav className='fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/80 bg-[#0b0c10]/85 backdrop-blur-xl transition-all'>
      <div className='mx-auto max-w-7xl px-6 sm:px-8 h-16 flex items-center justify-between'>
        <RestoAnalyticLogo />

        {/* Desktop Navigation */}
        <div className='hidden md:flex items-center gap-6'>
          {/* Navigation Items */}
          <div className='flex items-center gap-1.5 p-1 rounded-xl bg-zinc-900/60 border border-zinc-800/60'>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isPathActive(item.path);

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    'px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 select-none',
                    active
                      ? 'bg-zinc-800 text-white shadow-sm border border-zinc-700/60'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-850/40',
                  )}
                >
                  <Icon
                    className={cn(
                      'h-3.5 w-3.5 transition-colors',
                      active ? 'text-blue-400' : 'text-zinc-500',
                    )}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <Separator orientation='vertical' className='h-4 bg-zinc-800' />

          {/* Regional Market & Currency Pill */}
          <div className='flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs'>
            {/* Indian Flag Mini */}
            <div className='w-5 h-3.5 rounded-[3px] overflow-hidden border border-white/20 shadow-2xs flex flex-col shrink-0'>
              <div className='h-1/3 w-full bg-[#FF9933]' />
              <div className='h-1/3 w-full bg-white relative flex items-center justify-center'>
                <div className='w-0.5 h-0.5 rounded-full bg-[#000080]' />
              </div>
              <div className='h-1/3 w-full bg-[#138808]' />
            </div>
            <span className='font-mono font-bold text-zinc-300 text-[11px]'>
              INR (₹)
            </span>
          </div>

          {/* User Status / Account Indicator */}
          <div className='flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/80 border border-zinc-800'>
            <span className='w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' />
            <span className='text-xs font-medium text-zinc-300 max-w-[140px] truncate'>
              {user?.email || 'admin@resto.dev'}
            </span>
          </div>

          {/* Sign Out Button */}
          <Button
            variant='ghost'
            onClick={handleLogout}
            disabled={isPending}
            className='group h-8 px-3 rounded-lg text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/30 border border-transparent hover:border-red-900/40 transition-all cursor-pointer'
          >
            <LogOut className='mr-1.5 h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5' />
            {isPending ? 'Signing out…' : 'Sign Out'}
          </Button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className='md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors'
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label='Toggle navigation menu'
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className='md:hidden border-b border-zinc-800 bg-[#0b0c10]/95 backdrop-blur-2xl px-6 py-6 space-y-5 animate-in slide-in-from-top-3'>
          {/* Mobile Links */}
          <div className='flex flex-col gap-2'>
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isPathActive(item.path);

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all',
                    active
                      ? 'bg-zinc-800 text-white font-semibold border border-zinc-700'
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900',
                  )}
                >
                  <Icon
                    size={16}
                    className={active ? 'text-blue-400' : 'text-zinc-500'}
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <Separator className='bg-zinc-800' />

          {/* User Info & Currency in Mobile Drawer */}
          <div className='flex items-center justify-between text-xs text-zinc-400 px-1'>
            <div className='flex items-center gap-2'>
              <span className='w-2 h-2 rounded-full bg-emerald-500' />
              <span className='font-mono text-zinc-300'>
                {user?.email || 'admin@resto.dev'}
              </span>
            </div>
            <span className='font-mono text-zinc-300 font-semibold'>
              🇮🇳 INR (₹)
            </span>
          </div>

          {/* Mobile Sign Out */}
          <Button
            variant='ghost'
            className='w-full justify-center px-4 py-2.5 rounded-xl text-red-400 hover:text-red-300 bg-red-950/20 hover:bg-red-950/40 border border-red-900/30'
            onClick={() => {
              setMobileOpen(false);
              handleLogout();
            }}
          >
            <LogOut className='mr-2 h-4 w-4' />
            {isPending ? 'Logging out…' : 'Sign Out'}
          </Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
