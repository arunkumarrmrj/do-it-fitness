import React from 'react';
import { cn } from '../../lib/cn';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, onClick, hover = true }) => {
    return (
        <div
            onClick={onClick}
            className={cn(
                'bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-800 rounded-2xl p-4 shadow-sm',
                hover && onClick && 'cursor-pointer hover:shadow-md hover:scale-[1.01] active:scale-[0.99] transition-all',
                className
            )}
        >
            {children}
        </div>
    );
};
