import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Dumbbell, Utensils, CreditCard, User } from 'lucide-react';
import { cn } from '../../lib/cn';
import { useTranslation } from '../../contexts/LanguageContext';

export const Navigation: React.FC = () => {
    const { t } = useTranslation();
    const location = useLocation();

    const navItems = [
        { icon: Home, label: t('dashboard.title'), path: '/dashboard' },
        { icon: Dumbbell, label: t('training.title'), path: '/training' },
        { icon: Utensils, label: t('diet.title'), path: '/diet' },
        { icon: CreditCard, label: t('subscription.title'), path: '/subscription' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-lg border-t border-slate-100 dark:border-slate-800 pb-safe z-40">
            <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            cn(
                                'flex flex-col items-center justify-center gap-1 transition-all px-3 py-1 rounded-xl',
                                isActive
                                    ? 'text-primary-light dark:text-primary-dark'
                                    : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-slate-100 dark:hover:bg-slate-800'
                            )
                        }
                    >
                        <item.icon className="w-6 h-6" />
                        <span className="text-[10px] font-bold uppercase">{item.label}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};
