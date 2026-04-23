import React from 'react';
import { Separator } from '@/components/ui/separator';
import RestoAnalyticLogo from './resto-logo';

const Footer = () => {

  return (
    <>
      <div className='w-screen relative left-1/2 right-1/2 ml-[-50vw] mr-[-50vw] bg-zinc-900'>
        <Separator className='bg-zinc-900 opacity-50' />
      </div>

      <footer className='w-full bg-zinc-900 px-6 py-12'>
        <div className='mx-auto max-w-7xl'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
            <RestoAnalyticLogo />

            <span className='text-[10px] tracking-widest uppercase text-zinc-600'>
              &copy; {new Date().getFullYear()} All Rights Reserved
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
