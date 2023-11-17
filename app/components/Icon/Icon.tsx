import { type LinksFunction } from '@remix-run/node';
import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef } from 'react';

import iconSpriteHref from '../icons/sprite.svg';

import './Icon.css';

import { type IconName } from '#components/icons/name';

export type IconProps = ComponentPropsWithoutRef<'svg'> & {
  name: IconName;
  size?: 'sm' | 'md' | 'lg';
};

const links: LinksFunction = () => [{ rel: 'preload', href: iconSpriteHref, as: 'image' }];

export const Icon = ({ name, size = 'lg', children, className, ...props }: IconProps) => {
  if (children) {
    return (
      <span className={clsx('icon', className)}>
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
      className={clsx('icon__svg', `icon__svg--${size}`, className)}
    >
      <use href={`${iconSpriteHref}#${name}`} />
    </svg>
  );
};

Icon.links = links;
