import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Globe, Shield, Heart } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useTranslation } from '../../contexts/LanguageContext';

const Welcome = () => {
    const navigate = useNavigate();
    const { t, language, setLanguage } = useTranslation();

    const benefits = [
        { icon: Heart, text: 'Personalized Workout Plans' },
        { icon: Shield, text: 'Expert Nutrition Guidance' },
        { icon: Globe, text: 'Multi-language Support' },
    ];

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col max-w-md mx-auto overflow-hidden">
            {/* Hero Section */}
            <div className="relative h-[45vh] bg-primary-light dark:bg-primary-dark rounded-b-[40px] flex flex-col items-center justify-center p-6 text-white text-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-8 right-6"
                >
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
                        className="text-white hover:bg-white/10 rounded-full font-bold"
                    >
                        {language === 'en' ? 'العربية' : 'English'}
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4"
                >
                    <span className="text-3xl font-black italic">DI</span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl font-black tracking-tight mb-2"
                >
                    {t('common.welcome')} to DO IT
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm px-8"
                >
                    Start your transformation journey today with personalized plans and expert tools.
                </motion.p>
            </div>

            {/* Benefits Section */}
            <div className="flex-1 p-8 flex flex-col gap-6">
                <div className="space-y-4">
                    {benefits.map((benefit, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 + idx * 0.1 }}
                            className="flex items-center gap-4 p-4 bg-surface-light dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm"
                        >
                            <div className="w-10 h-10 rounded-xl bg-primary-light/10 dark:bg-primary-dark/20 flex items-center justify-center text-primary-light dark:text-primary-dark">
                                <benefit.icon className="w-5 h-5" />
                            </div>
                            <span className="font-semibold text-text-primary-light dark:text-text-primary-dark">
                                {benefit.text}
                            </span>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-auto space-y-4">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8 }}
                    >
                        <Button
                            className="w-full py-6 rounded-2xl text-lg font-bold shadow-xl shadow-primary-light/20"
                            onClick={() => navigate('/register')}
                        >
                            {t('onboarding.getStarted')}
                            <ChevronRight className="ml-2 w-5 h-5 rtl:rotate-180" />
                        </Button>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: 1 }}
                        className="text-[10px] text-center text-text-secondary-light dark:text-text-secondary-dark px-4"
                    >
                        By continuing, you agree to our <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>.
                    </motion.p>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
