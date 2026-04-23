import * as React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type FormFieldProps = {
  id: string;
  label?: string;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  error?: string;
};

export function FormField({
  id,
  label,
  inputProps,
  className,
  inputClassName,
  labelClassName,
  error,
}: FormFieldProps) {
  return (
    <div className={cn('space-y-2.5', className)}>
      {label && (
        <div className='flex justify-between items-center'>
          <Label
            htmlFor={id}
            className={cn(
              'text-[11px] uppercase tracking-widest text-zinc-500 font-semibold ml-0.5',
              labelClassName,
            )}
          >
            {label}
          </Label>
        </div>
      )}

      <div className='relative'>
        <Input
          id={id}
          className={cn(
            'h-11 bg-zinc-900/50 border-zinc-800 text-zinc-200 placeholder:text-zinc-700 focus-visible:ring-1 focus-visible:ring-zinc-700 focus-visible:border-zinc-600 transition-all rounded',
            error && 'border-red-500 focus-visible:ring-red-500',
            inputClassName,
          )}
          {...inputProps}
        />
      </div>

      {error && <p className='text-[11px] text-red-500 mt-1'>{error}</p>}
    </div>
  );
}
