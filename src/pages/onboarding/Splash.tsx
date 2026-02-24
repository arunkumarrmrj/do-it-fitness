import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';

const Splash = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (isAuthenticated) {
                navigate('/dashboard');
            } else {
                navigate('/welcome');
            }
        }, 2500);

        return () => clearTimeout(timer);
    }, [navigate, isAuthenticated]);

    return (
        <div className="min-h-screen bg-primary-light dark:bg-primary-dark flex flex-col items-center justify-center text-white overflow-hidden p-6 max-w-md mx-auto">
            <motion.div
                initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20
                }}
                className="relative"
            >
                <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
                    <span className="text-4xl font-black italic">DI</span>
                </div>

                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.6, 0.3]
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute -inset-4 bg-white/10 rounded-[40px] z-[-1]"
                />
            </motion.div>

            <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-4xl font-black tracking-tighter mb-2"
            >
                DO IT
            </motion.h1>

            <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 0.8 }}
                transition={{ delay: 0.7 }}
                className="text-white/80 font-medium text-center"
            >
                Your Path to a Healthier Life
            </motion.p>

            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-20"
            >
                <div className="flex gap-1.5">
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                        className="w-2 h-2 bg-white rounded-full"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-white/60 rounded-full"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-white/30 rounded-full"
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default Splash;
