import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef, type MouseEvent } from 'react';
import { useState } from 'react';

import {
  type CheckboxButtonContext,
  type CheckboxInputContext,
  isCheckboxButton,
  useCheckbox,
} from './Context';

type IndicatorInputProps = ComponentPropsWithoutRef<'input'>;

type IndicatorButtonProps = ComponentPropsWithoutRef<'button'>;

type IndicatorProps = IndicatorInputProps | IndicatorButtonProps;

const IndicatorButton = ({ className, ...props }: IndicatorButtonProps) => {
  const { id, defaultChecked, checked, onChange } = useCheckbox<CheckboxButtonContext>();
  const [previousDefaultChecked, setPreviousDefaultChecked] = useState(defaultChecked);
  const [previousChecked, setPreviousChecked] = useState(defaultChecked);
  const [isChecked, setIsChecked] = useState(defaultChecked ?? checked);

  if (previousDefaultChecked !== defaultChecked) {
    setPreviousDefaultChecked(defaultChecked);
    setIsChecked(defaultChecked);
  }

  if (previousChecked !== checked) {
    setPreviousChecked(checked);
    setIsChecked(checked);
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (defaultChecked === undefined) {
      setIsChecked((prevState) => !prevState);
    }

    if (onChange) {
      onChange(e);
    }
  };

  return (
    <button
      {...props}
      id={id}
      className={clsx(className)}
      role="checkbox"
      aria-checked={isChecked}
      aria-labelledby={`${id}-label`}
      onClick={handleClick}
    />
  );
};

const IndicatorInput = ({ className, ...props }: IndicatorInputProps) => {
  const { id, checked, defaultChecked, onChange } = useCheckbox<CheckboxInputContext>();

  return (
    <input
      {...props}
      type="checkbox"
      id={id}
      className={clsx('checkbox', className)}
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={onChange}
    />
  );
};

const Indicator = (props: IndicatorProps) => {
  const checkboxContext = useCheckbox();

  return (
    <div className="checkbox__indicator">
      {isCheckboxButton(checkboxContext) ? (
        <IndicatorButton {...(props as IndicatorButtonProps)} className={clsx(props.className)} />
      ) : (
        <IndicatorInput {...(props as IndicatorInputProps)} className={clsx(props.className)} />
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        strokeDasharray="100"
        fill="none"
        className="checkmark"
        aria-hidden
      >
        <path
          d="M20.25 6.75L9.75 17.25L4.5 12"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </div>
  );
};

export { Indicator };
