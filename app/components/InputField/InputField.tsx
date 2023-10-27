import { forwardRef, type ComponentPropsWithRef } from 'react';

import { cn } from '#utils/cn';

export const InputField = forwardRef<HTMLInputElement, ComponentPropsWithRef<'input'>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        {...props}
        ref={ref}
        className={cn(
          'peer',
          'bg-neutral-000 block w-full rounded-lg p-4 text-base ring-1 ring-inset ring-neutral-600',
          'placeholder:text-neutral-800',
          'focus:outline-none focus:ring-primary-500',
          className,
        )}
      />
    );
  },
);

InputField.displayName = 'InputField';
