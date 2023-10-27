import { type ComponentPropsWithoutRef } from 'react';

import { CheckboxProvider, type Context as CheckboxContext, isCheckboxButton } from './Context';
import { Indicator } from './Indicator';
import { Label } from './Label';

type CheckboxProps = CheckboxContext & ComponentPropsWithoutRef<'div'>;

export const Checkbox = ({ children, className, ...props }: CheckboxProps) => {
  const { id, defaultChecked, checked } = props;

  if (isCheckboxButton(props)) {
    return (
      <div className={className}>
        <CheckboxProvider
          id={id}
          defaultChecked={defaultChecked}
          checked={checked}
          as={props.as}
          onChange={props.onChange}
        >
          {children}
        </CheckboxProvider>
      </div>
    );
  }

  return (
    <div className={className}>
      <CheckboxProvider
        id={id}
        defaultChecked={defaultChecked}
        checked={checked}
        onChange={props.onChange}
      >
        {children}
      </CheckboxProvider>
    </div>
  );
};

Checkbox.Label = Label;
Checkbox.Indicator = Indicator;
