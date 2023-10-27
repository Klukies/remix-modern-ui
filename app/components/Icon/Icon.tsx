import { type LinksFunction } from '@remix-run/node';
import { type ComponentPropsWithoutRef } from 'react';

import iconSpriteHref from '../icons/sprite.svg';

import { type IconName } from '#components/icons/name';
import { cn } from '#utils/cn';

const sizeClassName = {
  sm: 'w-4 h-4',
  md: 'w-5, h-5',
  lg: 'w-6 h-6',
};

export type IconProps = ComponentPropsWithoutRef<'svg'> & {
  name: IconName;
  size?: keyof typeof sizeClassName;
};

const links: LinksFunction = () => [{ rel: 'preload', href: iconSpriteHref, as: 'image' }];

export const Icon = ({ name, size = 'lg', children, className, ...props }: IconProps) => {
  if (children) {
    return (
      <span className={cn('flex items-center gap-2', className)}>
        <Icon name={name} size={size} {...props} />
        {children}
      </span>
    );
  }

  return (
    <svg
      width="24"
      height="24"
      {...props}
      className={cn(sizeClassName[size], 'inline self-center', className)}
    >
      <use href={`${iconSpriteHref}#${name}`} />
    </svg>
  );
};

Icon.links = links;
