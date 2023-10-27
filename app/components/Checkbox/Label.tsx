import { type ComponentPropsWithoutRef } from 'react';

import { useCheckbox } from './Context';

import { cn } from '#utils/cn';

type LabelProps = Omit<ComponentPropsWithoutRef<'label'>, 'id'>;

export const Label = ({ className, children, ...props }: LabelProps) => {
  const { id } = useCheckbox();

  return (
    <label htmlFor={id} className={cn('cursor-pointer', className)} {...props}>
      {children}
    </label>
  );
};
