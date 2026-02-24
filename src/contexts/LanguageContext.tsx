import React, { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'ar';
type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    dir: Direction;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Mock implementation of translations
// In a real app, these would be in separate JSON files
const translations: Record<Language, Record<string, string>> = {
    en: {
        'common.welcome': 'Welcome',
        'common.next': 'Next',
        'common.back': 'Back',
        'common.submit': 'Submit',
        'common.cancel': 'Cancel',
        'onboarding.getStarted': 'Get Started',
        'onboarding.profileTitle': 'Create Your Profile',
        'onboarding.goalTitle': 'Select Your Goal',
        'dashboard.title': 'Dashboard',
        'training.title': 'Training',
        'diet.title': 'Diet Plan',
        'subscription.title': 'Subscription'
    },
    ar: {
        'common.welcome': 'مرحباً',
        'common.next': 'التالي',
        'common.back': 'رجوع',
        'common.submit': 'إرسال',
        'common.cancel': 'إلغاء',
        'onboarding.getStarted': 'ابدأ الآن',
        'onboarding.profileTitle': 'أنشئ ملفك الشخصي',
        'onboarding.goalTitle': 'اختر هدفك',
        'dashboard.title': 'لوحة التحكم',
        'training.title': 'التمارين',
        'diet.title': 'نظام غذائي',
        'subscription.title': 'الاشتراك'
    }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(() => {
        return (localStorage.getItem('language') as Language) || 'en';
    });

    const [dir, setDir] = useState<Direction>('ltr');

    useEffect(() => {
        const direction = language === 'ar' ? 'rtl' : 'ltr';
        setDir(direction);
        document.documentElement.lang = language;
        document.documentElement.dir = direction;
        localStorage.setItem('language', language);
    }, [language]);

    const t = (key: string) => {
        let result: any = translations[language];

        // Quick fallback to EN if key missing in AR
        if (language === 'ar' && !translations['ar'][key]) {
            result = translations['en'][key] || key;
        } else {
            result = translations[language][key] || key;
        }

        return result;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, dir, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    return context;
};
