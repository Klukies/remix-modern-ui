import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef } from 'react';

import './UnorderedList.css';

type UnorderedListProps = ComponentPropsWithoutRef<'ul'>;

export const UnorderedList = ({ children, className }: UnorderedListProps) => {
  return <ul className={clsx('unordered-list', className)}>{children}</ul>;
};
