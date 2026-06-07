'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium',
    'transition-colors duration-150',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:bg-disabled-bg-button disabled:text-disabled-fg-button disabled:border-disabled-border-button',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary-bg-button text-primary-fg-button border border-transparent',
          'hover:bg-primary-bg-hover-button',
          'active:bg-primary-bg-hover-button',
        ],
        secondary: [
          'bg-secondary-bg-button text-secondary-fg-button border border-secondary-border-button',
          'hover:bg-secondary-bg-hover-button',
        ],
        ghost: [
          'bg-transparent text-ghost-fg-button border border-transparent',
          'hover:bg-ghost-bg-hover-button hover:text-ghost-fg-hover-button',
        ],
        destructive: [
          'bg-destructive-bg-button text-destructive-fg-button border border-transparent',
          'hover:bg-destructive-bg-hover-button',
        ],
      },
      size: {
        sm: 'h-9 px-4 text-xs',
        md: 'h-11 px-6 text-sm',
        lg: 'h-[49px] px-8 text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'lg',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
