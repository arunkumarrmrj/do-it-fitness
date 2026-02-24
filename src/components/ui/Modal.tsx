import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '../../lib/cn';
import { Button } from './Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    className?: string;
    fullScreen?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    className,
    fullScreen = false
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className={cn(
                            'relative bg-background-light dark:bg-background-dark w-full overflow-hidden shadow-2xl z-10',
                            fullScreen ? 'h-full inset-0 rounded-0' : 'max-w-md rounded-3xl',
                            className
                        )}
                    >
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
                            <h3 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark">
                                {title}
                            </h3>
                            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                                <X className="w-6 h-6" />
                            </Button>
                        </div>
                        <div className="overflow-y-auto max-h-[calc(100vh-120px)] p-4">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
