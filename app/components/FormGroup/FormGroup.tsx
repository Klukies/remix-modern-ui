import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef } from 'react';

import { Hint } from '#components/Hint';
import { InputField } from '#components/InputField';

type FormGroupProps = ComponentPropsWithoutRef<'div'>;

export const FormGroup = ({ className, children }: FormGroupProps) => {
  return <div className={clsx('form-group', className)}>{children}</div>;
};

FormGroup.InputField = InputField;
FormGroup.Hint = Hint;
