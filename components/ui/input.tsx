'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      className={cn(
        'flex h-[52px] w-full rounded-xl border bg-default-bg px-4 text-sm text-primary-text',
        'placeholder:text-placeholder-text',
        'border-strong-border',
        'transition-colors duration-150',
        'focus:outline-none focus:border-focus-border',
        'disabled:bg-disabled-bg disabled:text-disabled-text disabled:cursor-not-allowed',
        'aria-[invalid=true]:border-error-border aria-[invalid=true]:focus:border-error-strong-border',
        className
      )}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
