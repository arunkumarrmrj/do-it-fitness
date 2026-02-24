import React from 'react';
import { cn } from '../../lib/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg' | 'icon';
    isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    className,
    variant = 'primary',
    size = 'md',
    isLoading,
    children,
    ...props
}) => {
    const variants = {
        primary: 'bg-primary-light dark:bg-primary-dark text-white hover:opacity-90',
        secondary: 'bg-surface-light dark:bg-surface-dark text-text-primary-light dark:text-text-primary-dark border border-slate-200 dark:border-slate-700',
        outline: 'bg-transparent border-2 border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark hover:bg-primary-light/10',
        ghost: 'bg-transparent text-text-primary-light dark:text-text-primary-dark hover:bg-slate-100 dark:hover:bg-slate-800',
        danger: 'bg-error text-white hover:opacity-90',
    };

    const sizes = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg',
        icon: 'p-2',
    };

    return (
        <button
            className={cn(
                'inline-flex items-center justify-center rounded-xl font-medium transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none',
                variants[variant],
                sizes[size],
                className
            )}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
                children
            )}
        </button>
    );
};
