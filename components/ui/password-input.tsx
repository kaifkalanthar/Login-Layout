'use client';

import { Eye, EyeOff } from 'lucide-react';
import { forwardRef, useState } from 'react';
import { cn } from '@/lib/utils';
import type { InputProps } from './input';

const PasswordInput = forwardRef<HTMLInputElement, Omit<InputProps, 'type'>>(
  ({ className, ...props }, ref) => {
    const [visible, setVisible] = useState(false);

    return (
      <div className="relative">
        <input
          type={visible ? 'text' : 'password'}
          ref={ref}
          className={cn(
            'flex h-[52px] w-full rounded-xl border bg-default-bg px-4 pr-11 text-sm text-primary-text',
            'placeholder:text-placeholder-text',
            'border-strong-border',
            'transition-colors duration-150',
            'focus:outline-none focus:border-focus-border',
            'disabled:bg-disabled-bg disabled:text-disabled-text disabled:cursor-not-allowed',
            'aria-[invalid=true]:border-error-border aria-[invalid=true]:focus:border-error-strong-border',
            className,
          )}
          {...props}
        />
        <button
          type="button"
          aria-label={visible ? 'Hide password' : 'Show password'}
          onClick={() => setVisible((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-fg hover:text-secondary-fg transition-colors"
          tabIndex={-1}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    );
  },
);
PasswordInput.displayName = 'PasswordInput';

export { PasswordInput };
