import { cn } from '@/utils/cn';

export function Panel({ as: Tag = 'div', className, children, ...props }) {
  return (
    <Tag className={cn('rounded-2xl surface-glass', className)} {...props}>
      {children}
    </Tag>
  );
}
