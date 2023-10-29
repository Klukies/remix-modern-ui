import { type ComponentPropsWithoutRef, type MouseEvent } from 'react';
import { useState } from 'react';

import {
  type CheckboxButtonContext,
  type CheckboxInputContext,
  isCheckboxButton,
  useCheckbox,
} from './Context';

import { cn } from '#utils/cn';

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
      className={cn(
        'pointer flex h-6 w-6 items-center justify-center rounded-lg p-0 ring-1 ring-inset ring-neutral-600',
        'hover:bg-primary-200 hover:ring-primary-500',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
        'aria-checked:bg-primary-200 aria-checked:ring-primary-200',
        'aria-checked:hover:ring-primary-500',
        'aria-checked:focus-visible:ring-primary-500',
        'motion-safe:transition-[background-color,box-shadow] motion-safe:duration-150 motion-safe:ease-in-out',
        className,
      )}
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
      className={cn('checkbox', className)}
      checked={checked}
      defaultChecked={defaultChecked}
      onChange={onChange}
    />
  );
};

const Indicator = (props: IndicatorProps) => {
  const checkboxContext = useCheckbox();
  const classes = cn('peer pointer w-6 h-6 p-0 ring-1 ring-neutral-600 rounded-lg');

  return (
    <div className="relative">
      {isCheckboxButton(checkboxContext) ? (
        <IndicatorButton
          {...(props as IndicatorButtonProps)}
          className={cn(classes, props.className)}
        />
      ) : (
        <IndicatorInput
          {...(props as IndicatorInputProps)}
          className={cn(classes, props.className)}
        />
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        strokeDasharray="100"
        fill="none"
        className="group pointer-events-none absolute inset-0 m-0.5 bg-transparent text-primary-500"
        aria-hidden
      >
        <path
          className={cn(
            'stroke-[2.5px] stroke-dashoffset-[-75]',
            'peer-checked:group-[]:stroke-dashoffset-[0] peer-aria-checked:group-[]:stroke-dashoffset-[0]',
            'motion-safe:transition-[stroke-dashoffset] motion-safe:duration-300 motion-safe:ease-out',
          )}
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
