import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Flame, Droplets, Trophy, Calendar, ChevronRight, Activity } from 'lucide-react';
import { Layout } from '../../components/layout/Layout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { useUser } from '../../contexts/UserContext';
import { calculateBMI } from '../../lib/utils';

const Dashboard = () => {
    const navigate = useNavigate();
    const { user } = useUser();
    const firstName = user?.firstName || 'User';

    const bmi = user ? calculateBMI(user.weight, user.height) : 0;

    const stats = [
        { label: 'Calories', value: '1,840', target: '2,200', unit: 'kcal', icon: Flame, color: 'text-error', bg: 'bg-error/10' },
        { label: 'Water', value: '1.5', target: '2.5', unit: 'L', icon: Droplets, color: 'text-primary-light', bg: 'bg-primary-light/10' },
        { label: 'Streak', value: '12', target: '30', unit: 'days', icon: Trophy, color: 'text-warning', bg: 'bg-warning/10' },
    ];

    return (
        <Layout>
            <div className="space-y-6">
                {/* Personalized Greeting */}
                <section>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        className="text-sm font-bold uppercase tracking-wider text-text-secondary-light dark:text-text-secondary-dark"
                    >
                        Good Morning,
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl font-black text-text-primary-light dark:text-text-primary-dark tracking-tight"
                    >
                        {firstName}! 👋
                    </motion.h1>
                </section>

                {/* Quick Stats Grid */}
                <section className="grid grid-cols-3 gap-3">
                    {stats.map((stat, idx) => (
                        <Card key={idx} className="p-3 flex flex-col items-center text-center gap-2">
                            <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <div className="text-lg font-black leading-none">{stat.value}</div>
                                <div className="text-[10px] text-text-secondary-light dark:text-text-secondary-dark font-bold uppercase mt-1">
                                    {stat.label}
                                </div>
                            </div>
                        </Card>
                    ))}
                </section>

                {/* BMI & Status Card */}
                <section>
                    <Card className="bg-gradient-to-br from-primary-light to-blue-600 dark:from-primary-dark dark:to-blue-500 text-white p-5 border-none relative overflow-hidden shadow-xl shadow-primary-light/20">
                        <Activity className="absolute -right-4 -bottom-4 w-32 h-32 opacity-10 rotate-12" />
                        <div className="relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold">Your Body Index</h3>
                                    <p className="text-white/80 text-sm">Calculated based on your profile</p>
                                </div>
                                <Badge variant="outline" className="bg-white/10 border-white/20 text-white">
                                    Healthy
                                </Badge>
                            </div>
                            <div className="flex items-end gap-2">
                                <span className="text-4xl font-black">{bmi}</span>
                                <span className="text-sm font-bold opacity-80 mb-2">kg/m²</span>
                            </div>
                            <div className="mt-4 h-1.5 w-full bg-white/20 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(bmi / 40) * 100}%` }}
                                    className="h-full bg-white"
                                />
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Today's Plan Preview */}
                <section className="space-y-3">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold tracking-tight">Today's Schedule</h2>
                        <button className="text-sm font-bold text-primary-light dark:text-primary-dark flex items-center">
                            View All <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="space-y-3">
                        <Card
                            onClick={() => navigate('/training')}
                            className="p-4 flex items-center gap-4 hover:border-primary-light/50 transition-colors cursor-pointer"
                        >
                            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center">
                                <span className="text-xs font-black leading-none">08</span>
                                <span className="text-[10px] uppercase font-bold text-text-secondary-light">AM</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold">Chest & Triceps</h4>
                                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">Upper Body • 45 mins</p>
                            </div>
                            <Badge variant="primary" className="rounded-lg">Train</Badge>
                        </Card>
                        <Card
                            onClick={() => navigate('/diet')}
                            className="p-4 flex items-center gap-4 hover:border-primary-light/50 transition-colors cursor-pointer"
                        >
                            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl flex flex-col items-center justify-center">
                                <span className="text-xs font-black leading-none">12</span>
                                <span className="text-[10px] uppercase font-bold text-text-secondary-light">PM</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold">Grilled Chicken Salad</h4>
                                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">High Protein • 450 kcal</p>
                            </div>
                            <Badge variant="success" className="rounded-lg">Meal</Badge>
                        </Card>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Dashboard;
