import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Target, TrendingUp, ChevronLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { UserGoal, ActivityLevel } from '../../types';

const GoalSelection = () => {
    const navigate = useNavigate();
    const [selectedGoal, setSelectedGoal] = useState<UserGoal>('loseWeight');
    const [activity, setActivity] = useState<ActivityLevel>('moderate');

    const goals: { id: UserGoal; label: string; desc: string; icon: any }[] = [
        { id: 'loseWeight', label: 'Lose Weight', desc: 'Burn fat and get leaner with targeted cardio and calorie deficit.', icon: Zap },
        { id: 'gainMuscle', label: 'Gain Muscle', desc: 'Build strength and muscle mass with high-intensity training.', icon: Target },
        { id: 'gainWeight', label: 'Bulk Up', desc: 'Increase overall body mass and strength with heavy lifting.', icon: TrendingUp },
    ];

    const handleNext = () => {
        const tempProfile = JSON.parse(localStorage.getItem('temp_profile') || '{}');
        localStorage.setItem('temp_profile', JSON.stringify({ ...tempProfile, goal: selectedGoal, activityLevel: activity }));
        navigate('/register/media');
    };

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark p-6 max-w-md mx-auto">
            <div className="mb-8 flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <Button variant="ghost" onClick={() => navigate(-1)} className="px-0">
                        <ChevronLeft className="w-5 h-5" />
                    </Button>
                    <div className="flex gap-2">
                        <div className="h-1.5 w-12 rounded-full bg-success w-12" />
                        <div className="h-1.5 w-16 rounded-full bg-primary-light w-16" />
                        <div className="h-1.5 w-12 rounded-full bg-slate-200" />
                    </div>
                </div>

                <h1 className="text-3xl font-black text-text-primary-light dark:text-text-primary-dark tracking-tight">
                    What's your goal?
                </h1>
                <p className="text-text-secondary-light dark:text-text-secondary-dark">
                    We will tailor your workouts and diet based on your primary objective.
                </p>
            </div>

            <div className="space-y-4">
                {goals.map((goal) => (
                    <Card
                        key={goal.id}
                        onClick={() => setSelectedGoal(goal.id)}
                        className={`p-5 flex items-start gap-4 transition-all duration-300 ${selectedGoal === goal.id ? 'ring-2 ring-primary-light bg-primary-light/5 border-transparent' : ''}`}
                    >
                        <div className={`p-3 rounded-xl ${selectedGoal === goal.id ? 'bg-primary-light text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                            <goal.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-lg text-text-primary-light dark:text-text-primary-dark">{goal.label}</h3>
                            <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark leading-relaxed">
                                {goal.desc}
                            </p>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="mt-10 space-y-4">
                <h3 className="font-bold text-text-primary-light dark:text-text-primary-dark">Activity Level</h3>
                <div className="flex overflow-x-auto gap-3 pb-4 no-scrollbar">
                    {['sedentary', 'light', 'moderate', 'active', 'veryActive'].map((level) => (
                        <button
                            key={level}
                            onClick={() => setActivity(level as ActivityLevel)}
                            className={`whitespace-nowrap px-6 py-3 rounded-full font-bold text-sm transition-all ${activity === level ? 'bg-primary-light text-white shadow-lg' : 'bg-surface-light dark:bg-surface-dark border border-slate-200 dark:border-slate-800'}`}
                        >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-auto pt-10">
                <Button className="w-full py-6 rounded-2xl text-lg font-bold" onClick={handleNext}>
                    Continue
                </Button>
            </div>
        </div>
    );
};

export default GoalSelection;
