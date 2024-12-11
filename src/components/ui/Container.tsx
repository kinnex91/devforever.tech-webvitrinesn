import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function Container({ 
  children, 
  className, 
  size = 'lg', 
  ...props 
}: ContainerProps) {
  return (
    <div
      className={clsx(
        'mx-auto px-4 sm:px-6 lg:px-8',
        {
          'max-w-4xl': size === 'sm',
          'max-w-5xl': size === 'md',
          'max-w-7xl': size === 'lg',
          'max-w-[96rem]': size === 'xl',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}