import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef } from 'react';

import { useCheckbox } from './Context';

type LabelProps = Omit<ComponentPropsWithoutRef<'label'>, 'id'>;

export const Label = ({ className, children, ...props }: LabelProps) => {
  const { id } = useCheckbox();

  return (
    <label htmlFor={id} className={clsx('checkbox__label', className)} {...props}>
      {children}
    </label>
  );
};
