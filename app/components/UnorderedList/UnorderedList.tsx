import { type ComponentPropsWithoutRef } from 'react';

import { cn } from '#utils/cn';

type UnorderedListProps = ComponentPropsWithoutRef<'ul'>;

export const UnorderedList = ({ children, className }: UnorderedListProps) => {
  return <ul className={cn('m-0 list-none p-0', className)}>{children}</ul>;
};
