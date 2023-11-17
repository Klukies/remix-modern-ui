import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef } from 'react';

import './IconButton.css';

type IconButtonProps = ComponentPropsWithoutRef<'button'> & {
  border?: boolean;
  filled?: boolean;
  pending?: boolean;
};

export const IconButton = ({
  border,
  filled,
  pending,
  className,
  children,
  ...props
}: IconButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        'icon-button',
        filled && 'icon-button--filled',
        border && 'icon-button--border',
        pending && 'icon-button--pending',
        className,
      )}
      disabled={pending}
    >
      {pending ? null : children}
    </button>
  );
};
