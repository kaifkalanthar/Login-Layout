'use client';

import { cn } from '@/lib/utils';

interface RadioCardProps {
  value: string;
  selected: boolean;
  onSelect: (value: string) => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

function RadioCard({
  value,
  selected,
  onSelect,
  title,
  description,
  icon,
  disabled,
  className,
}: RadioCardProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      onClick={() => onSelect(value)}
      className={cn(
        'flex items-center gap-4 w-full rounded-xl border px-5 py-4 text-left',
        'transition-colors duration-150',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed disabled:opacity-50',
        selected
          ? 'border-focus-border bg-brand-primary-bg'
          : 'border-strong-border bg-default-bg hover:bg-subtle-bg',
        className
      )}
    >
      {icon && (
        <span className={cn('shrink-0', selected ? 'text-brand-primary-fg' : 'text-muted-fg')}>
          {icon}
        </span>
      )}

      <span className="flex-1 min-w-0">
        <span
          className={cn(
            'block text-sm font-semibold',
            selected ? 'text-brand-text' : 'text-primary-text'
          )}
        >
          {title}
        </span>
        {description && <span className="block text-xs text-muted-text mt-0.5">{description}</span>}
      </span>

      {/* Radio indicator */}
      <span
        className={cn(
          'h-5 w-5 shrink-0 rounded-full border-2 flex items-center justify-center',
          selected ? 'border-brand-primary-fg' : 'border-strong-border'
        )}
      >
        {selected && <span className="h-2.5 w-2.5 rounded-full bg-brand-primary-fg" />}
      </span>
    </button>
  );
}

export { RadioCard };
