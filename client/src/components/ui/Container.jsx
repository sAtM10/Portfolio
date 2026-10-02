import { cn } from '@/utils/cn';

const widths = {
  default: 'max-w-6xl',
  wide: 'max-w-7xl',
  narrow: 'max-w-3xl',
};

export function Container({ as: Tag = 'div', size = 'default', className, children, ...props }) {
  return (
    <Tag className={cn('mx-auto w-full px-5 sm:px-8', widths[size], className)} {...props}>
      {children}
    </Tag>
  );
}
