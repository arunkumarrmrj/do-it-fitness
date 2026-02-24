import React from 'react';
import { cn } from '../../lib/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, label, error, icon, ...props }, ref) => {
        return (
            <div className="flex flex-col gap-1.5 w-full">
                {label && (
                    <label className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark px-1">
                        {label}
                    </label>
                )}
                <div className="relative">
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary-light dark:text-text-secondary-dark">
                            {icon}
                        </div>
                    )}
                    <input
                        ref={ref}
                        className={cn(
                            'w-full bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-text-primary-light dark:text-text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark transition-all',
                            icon && 'pl-10',
                            error && 'border-error ring-error/20',
                            className
                        )}
                        {...props}
                    />
                </div>
                {error && <span className="text-xs text-error px-1 font-medium">{error}</span>}
            </div>
        );
    }
);

Input.displayName = 'Input';
