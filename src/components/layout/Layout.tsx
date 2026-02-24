import React from 'react';
import { motion } from 'framer-motion';
import { Header } from './Header';
import { Navigation } from './Navigation';
import { cn } from '../../lib/cn';

interface LayoutProps {
    children: React.ReactNode;
    showNav?: boolean;
    showHeader?: boolean;
    className?: string;
}

export const Layout: React.FC<LayoutProps> = ({
    children,
    showNav = true,
    showHeader = true,
    className
}) => {
    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark flex flex-col max-w-md mx-auto border-x border-slate-100 dark:border-slate-800 shadow-xl overflow-x-hidden">
            {showHeader && <Header />}

            <motion.main
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className={cn(
                    'flex-1 p-4 pb-24',
                    !showHeader && 'pt-10',
                    className
                )}
            >
                {children}
            </motion.main>

            {showNav && <Navigation />}
        </div>
    );
};
