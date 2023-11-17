import { useFetchers, useNavigation } from '@remix-run/react';
import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef } from 'react';

import './Toast.css';

type ToastProps = ComponentPropsWithoutRef<'div'> & {
  variant?: 'success' | 'error';
};

export const Toast = ({ variant, className, children }: ToastProps) => {
  const navigation = useNavigation();
  const fetchers = useFetchers();
  const isSubmitting =
    navigation.state === 'submitting' || fetchers.some((fetcher) => fetcher.state === 'submitting');

  if (!variant || !children || isSubmitting) {
    return null;
  }

  return (
    <span className={clsx('toast', className)} role="alert">
      {children}
    </span>
  );
};
