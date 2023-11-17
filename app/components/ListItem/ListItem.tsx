import { clsx } from 'clsx';
import { type ComponentPropsWithoutRef } from 'react';

import './ListItem.css';

type ListItemProps = ComponentPropsWithoutRef<'li'>;

export const ListItem = ({ className, children }: ListItemProps) => {
  return <li className={clsx('list-item', className)}>{children}</li>;
};
