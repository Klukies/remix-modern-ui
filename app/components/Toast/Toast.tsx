import { useFetchers, useNavigation } from '@remix-run/react';
import { type ComponentPropsWithoutRef } from 'react';

import { cn } from '#utils/cn';

type ToastProps = ComponentPropsWithoutRef<'div'> & {
  variant?: 'success' | 'error';
};

export const Toast = ({ variant, children }: ToastProps) => {
  const navigation = useNavigation();
  const fetchers = useFetchers();
  const isSubmitting =
    navigation.state === 'submitting' || fetchers.some((fetcher) => fetcher.state === 'submitting');

  if (!variant || !children || isSubmitting) {
    return null;
  }

  return (
    <span
      className={cn(
        'toast',
        'fixed bottom-12 right-12 rounded bg-neutral-900 p-5 text-neutral-100 shadow-3',
        variant === 'error' && 'bg-orange-300',
        'motion-safe:animate-toast-slide-in-out',
      )}
      role="alert"
    >
      {children}
    </span>
  );
};
