import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { useTranslation } from '../../contexts/LanguageContext';
import { Moon, Sun, Languages, Bell } from 'lucide-react';
import { Button } from '../ui/Button';

export const Header: React.FC = () => {
    const { isDark, setTheme, theme } = useTheme();
    const { language, setLanguage } = useTranslation();

    return (
        <header className="sticky top-0 z-40 w-full bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-lg px-4 py-3 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary-light dark:bg-primary-dark flex items-center justify-center font-black text-white italic">
                    DI
                </div>
                <span className="font-black text-xl tracking-tight text-text-primary-light dark:text-text-primary-dark">
                    DO IT
                </span>
            </div>

            <div className="flex items-center gap-1">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                    className="rounded-full"
                >
                    <Languages className="w-5 h-5" />
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(isDark ? 'light' : 'dark')}
                    className="rounded-full"
                >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full" />
                </Button>
            </div>
        </header>
    );
};
