import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Upload, CheckCircle2, X, Plus, Shield } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { useUser } from '../../contexts/UserContext';
import { useAuth } from '../../contexts/AuthContext';

const MediaUpload = () => {
    const navigate = useNavigate();
    const { completeOnboarding } = useUser();
    const { login } = useAuth();
    const [photo, setPhoto] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFinish = async () => {
        setIsUploading(true);
        const tempProfile = JSON.parse(localStorage.getItem('temp_profile') || '{}');

        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        const finalProfile = {
            ...tempProfile,
            id: Math.random().toString(36).substr(2, 9),
            profilePhotoUrl: photo || undefined,
            preferences: {
                language: 'en',
                theme: 'system',
                notifications: true
            }
        };

        completeOnboarding(finalProfile);
        await login(finalProfile.email);
        localStorage.removeItem('temp_profile');
        navigate('/dashboard');
        setIsUploading(false);
    };

    const simulateUpload = () => {
        // In real app, this would be a file input change
        setPhoto('https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop');
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark p-6 max-w-md mx-auto flex flex-col">
            <div className="mb-8 flex flex-col gap-6">
                <div className="flex gap-2 justify-end">
                    <div className="h-1.5 w-12 rounded-full bg-success" />
                    <div className="h-1.5 w-12 rounded-full bg-success" />
                    <div className="h-1.5 w-16 rounded-full bg-primary-light w-16" />
                </div>

                <h1 className="text-3xl font-black text-text-primary-light dark:text-text-primary-dark tracking-tight">
                    Current Physique
                </h1>
                <p className="text-text-secondary-light dark:text-text-secondary-dark">
                    Upload a progress photo to track your transformation visually. This is optional.
                </p>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-8">
                <div className="relative group">
                    <div className={`w-64 h-64 rounded-[40px] border-4 border-dashed overflow-hidden flex items-center justify-center transition-all ${photo ? 'border-primary-light shadow-2xl' : 'border-slate-200 dark:border-slate-800 bg-surface-light dark:bg-surface-dark'}`}>
                        <AnimatePresence mode="wait">
                            {photo ? (
                                <motion.img
                                    key="photo"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    src={photo}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <motion.div
                                    key="empty"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center gap-3 text-slate-400"
                                >
                                    <Camera className="w-12 h-12" />
                                    <span className="font-bold text-sm tracking-widest uppercase">Take Photo</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {!photo && (
                            <button
                                onClick={simulateUpload}
                                className="absolute inset-0 z-10 opacity-0 cursor-pointer"
                            />
                        )}
                    </div>

                    {photo && (
                        <button
                            onClick={() => setPhoto(null)}
                            className="absolute -top-3 -right-3 w-10 h-10 bg-error text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-all"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    )}

                    {!photo && (
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={simulateUpload}
                            className="absolute -bottom-4 bg-primary-light text-white p-4 rounded-3xl shadow-xl shadow-primary-light/30"
                        >
                            <Plus className="w-6 h-6" />
                        </motion.button>
                    )}
                </div>

                <div className="w-full max-w-[200px]">
                    <div className="flex items-center gap-2 text-text-secondary-light dark:text-text-secondary-dark justify-center">
                        <Shield className="w-4 h-4" />
                        <span className="text-xs font-medium">Your data is private & secure</span>
                    </div>
                </div>
            </div>

            <div className="mt-auto space-y-4 pt-10">
                <Button
                    className="w-full py-6 rounded-2xl text-lg font-bold"
                    onClick={handleFinish}
                    isLoading={isUploading}
                >
                    Complete Setup
                </Button>
                <button
                    onClick={handleFinish}
                    className="w-full py-3 text-text-secondary-light dark:text-text-secondary-dark font-bold text-sm hover:underline"
                    disabled={isUploading}
                >
                    Skip for now
                </button>
            </div>
        </div>
    );
};

export default MediaUpload;
