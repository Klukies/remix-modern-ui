import { clsx } from 'clsx';
import { forwardRef, type ComponentPropsWithRef } from 'react';

import './InputField.css';

export const InputField = forwardRef<HTMLInputElement, ComponentPropsWithRef<'input'>>(
  ({ className, ...props }, ref) => {
    return <input {...props} ref={ref} className={clsx('input-field', className)} />;
  },
);

InputField.displayName = 'InputField';
