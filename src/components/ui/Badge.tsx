import React from 'react';
import { cn } from '../../lib/cn';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'primary' | 'success' | 'warning' | 'error' | 'outline';
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', className }) => {
    const variants = {
        primary: 'bg-primary-light/10 text-primary-light dark:text-primary-dark',
        success: 'bg-success/10 text-success',
        warning: 'bg-warning/10 text-warning',
        error: 'bg-error/10 text-error',
        outline: 'border border-slate-200 dark:border-slate-700 text-text-secondary-light dark:text-text-secondary-dark'
    };

    return (
        <span className={cn('px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider', variants[variant], className)}>
            {children}
        </span>
    );
};
