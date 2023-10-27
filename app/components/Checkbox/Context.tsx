import {
  type ReactNode,
  createContext,
  useContext,
  type MouseEventHandler,
  type ChangeEventHandler,
} from 'react';

export type CheckboxButtonContext = {
  as: 'button';
  id: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: MouseEventHandler<HTMLButtonElement>;
};

export type CheckboxInputContext = {
  id: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
};

export type Context = CheckboxInputContext | CheckboxButtonContext;
const CheckboxContext = createContext<Context | undefined>(undefined);

export const isCheckboxButton = (context: Context): context is CheckboxButtonContext => {
  return (context as CheckboxButtonContext).as === 'button';
};

type CheckboxProviderProps = Context & { children: ReactNode };
export const CheckboxProvider = ({ children, ...value }: CheckboxProviderProps) => {
  return <CheckboxContext.Provider value={value}>{children}</CheckboxContext.Provider>;
};

export const useCheckbox = <Context extends CheckboxInputContext | CheckboxButtonContext>() => {
  const context = useContext(CheckboxContext);

  if (!context) {
    throw new Error("Checkbox compound component can't be rendered outside of Checkbox");
  }

  return context as Context;
};
