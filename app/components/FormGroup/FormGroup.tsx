import { type ComponentPropsWithoutRef } from 'react';

import { Hint } from '#components/Hint';
import { InputField } from '#components/InputField';
import { cn } from '#utils/cn';

type FormGroupProps = ComponentPropsWithoutRef<'div'>;

export const FormGroup = ({ className, children }: FormGroupProps) => {
  return <div className={cn('form-group', className)}>{children}</div>;
};

FormGroup.InputField = InputField;
FormGroup.Hint = Hint;
