import { type ComponentPropsWithoutRef } from 'react';

import { cn } from '#utils/cn';

type IconButtonProps = ComponentPropsWithoutRef<'button'> & {
  border?: boolean;
  filled?: boolean;
};

export const IconButton = ({ border, filled, className, children, ...props }: IconButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        'flex h-12 w-12 items-center rounded-3xl p-3 ring-inset',
        !filled && 'hover:ring-1 hover:ring-neutral-900',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
        !filled && 'active:bg-neutral-200 active:hover:ring-neutral-900',
        border && 'ring-1 ring-neutral-500',
        className,
      )}
    >
      {children}
    </button>
  );
};
