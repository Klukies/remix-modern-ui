import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef } from 'react';

import './Hint.css';

type HintProps = ComponentPropsWithoutRef<'span'>;

export const Hint = ({ children, className, ...props }: HintProps) => {
  return (
    <p {...props} className={clsx('hint', className)}>
      {children}
    </p>
  );
};
