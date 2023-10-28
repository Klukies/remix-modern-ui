import { type LinksFunction } from '@remix-run/node';
import { type ComponentPropsWithoutRef } from 'react';

import iconButtonStylesheetHref from './IconButton.css';

import { cn } from '#utils/cn';

type IconButtonProps = ComponentPropsWithoutRef<'button'> & {
  border?: boolean;
  filled?: boolean;
  pending?: boolean;
};

const links: LinksFunction = () => [
  { rel: 'preload', href: iconButtonStylesheetHref, as: 'style' },
  { rel: 'stylesheet', href: iconButtonStylesheetHref },
];

export const IconButton = ({
  border,
  filled,
  pending,
  className,
  children,
  ...props
}: IconButtonProps) => {
  return (
    <button
      {...props}
      className={cn(
        'icon-button',
        'flex h-12 w-12 items-center justify-center rounded-3xl p-3 ring-inset',
        !filled && 'hover:ring-1 hover:ring-neutral-900',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500',
        !filled && 'active:bg-neutral-200 active:hover:ring-neutral-900',
        border && 'ring-1 ring-neutral-500',
        pending && 'icon-button--pending hover:ring-0',
        className,
      )}
      disabled={pending}
    >
      {pending ? null : children}
    </button>
  );
};

IconButton.links = links;
