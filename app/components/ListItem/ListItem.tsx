import { type ComponentPropsWithoutRef } from 'react';

import { cn } from '#utils/cn';

type ListItemProps = ComponentPropsWithoutRef<'li'>;

export const ListItem = ({ className, children }: ListItemProps) => {
  return <li className={cn('flex items-center', className)}>{children}</li>;
};
