import { type ComponentPropsWithoutRef } from 'react';

import { cn } from '#utils/cn';

type HintProps = ComponentPropsWithoutRef<'span'>;

export const Hint = ({ children, className, ...props }: HintProps) => {
  return (
    <p {...props} className={cn('peer-aria-invalid:text-orange-300', className)}>
      {children}
    </p>
  );
};
