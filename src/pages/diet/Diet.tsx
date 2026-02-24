import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Utensils, Droplets, PieChart, ShoppingBag, Plus, ChevronRight, Apple, Beef, Salad } from 'lucide-react';
import { Layout } from '../../components/layout/Layout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

const Diet = () => {
    const [waterCups, setWaterCups] = useState(6);
    const targetWater = 10;

    const meals = [
        { type: 'Breakfast', name: 'Oatmeal with Berries', calories: 350, protein: 12, carbs: 55, fat: 8, icon: Apple, time: '08:00 AM' },
        { type: 'Lunch', name: 'Grilled Chicken & Quinoa', calories: 550, protein: 45, carbs: 40, fat: 12, icon: Beef, time: '12:30 PM' },
        { type: 'Dinner', name: 'Salmon with Asparagus', calories: 480, protein: 35, carbs: 10, fat: 25, icon: Salad, time: '07:30 PM' },
    ];

    return (
        <Layout>
            <div className="space-y-6">
                <section>
                    <h1 className="text-3xl font-black text-text-primary-light dark:text-text-primary-dark tracking-tight">
                        Diet Plan
                    </h1>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                        2,200 kcal daily target for Muscle Gain
                    </p>
                </section>

                {/* Macro Summary Card */}
                <section>
                    <Card className="p-5 flex items-center justify-between gap-4">
                        <div className="flex-1 space-y-4">
                            <div className="flex justify-between items-center px-1">
                                <span className="text-sm font-black uppercase text-text-secondary-light">Calories</span>
                                <span className="text-sm font-black">1,380 / 2,200</span>
                            </div>
                            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '62%' }}
                                    className="h-full bg-primary-light"
                                />
                            </div>
                            <div className="flex justify-around pt-2">
                                <div className="text-center">
                                    <p className="text-[10px] font-black uppercase text-primary-light">Protein</p>
                                    <p className="text-sm font-black">92g</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] font-black uppercase text-success">Carbs</p>
                                    <p className="text-sm font-black">105g</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] font-black uppercase text-warning">Fats</p>
                                    <p className="text-sm font-black">35g</p>
                                </div>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Water Tracker */}
                <section className="space-y-3">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold tracking-tight">Hydration</h2>
                        <Badge variant="primary">{waterCups * 250}ml / {targetWater * 250}ml</Badge>
                    </div>
                    <Card className="p-5 relative overflow-hidden">
                        <Droplets className="absolute -left-4 -bottom-4 w-24 h-24 text-primary-light/5 -rotate-12" />
                        <div className="flex justify-between items-center gap-2 relative z-10">
                            <div className="flex-1 grid grid-cols-5 gap-2">
                                {Array.from({ length: targetWater }).map((_, i) => (
                                    <motion.button
                                        key={i}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setWaterCups(i + 1)}
                                        className={`h-10 rounded-xl flex items-center justify-center transition-all ${i < waterCups ? 'bg-primary-light text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-300'}`}
                                    >
                                        <Droplets className="w-5 h-5" />
                                    </motion.button>
                                ))}
                            </div>
                            <Button
                                size="icon"
                                variant="outline"
                                className="rounded-2xl border-dashed border-2"
                                onClick={() => setWaterCups(prev => Math.min(prev + 1, targetWater))}
                            >
                                <Plus className="w-6 h-6" />
                            </Button>
                        </div>
                    </Card>
                </section>

                {/* Meal List */}
                <section className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-bold tracking-tight">Today's Meals</h2>
                        <Button variant="ghost" size="sm" className="font-bold gap-1">
                            <ShoppingBag className="w-4 h-4" /> List
                        </Button>
                    </div>
                    <div className="space-y-3">
                        {meals.map((meal, idx) => (
                            <Card key={idx} className="p-4 flex items-center gap-4 group">
                                <div className="w-14 h-14 bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-800 rounded-2xl flex items-center justify-center text-primary-light group-hover:scale-110 transition-transform">
                                    <meal.icon className="w-7 h-7" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-bold text-sm">{meal.name}</h4>
                                            <p className="text-[10px] font-black uppercase text-text-secondary-light tracking-wide">{meal.time} • {meal.type}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 mt-2">
                                        <span className="text-xs font-bold text-error">{meal.calories} kcal</span>
                                        <div className="flex gap-2">
                                            <span className="text-[10px] font-bold text-text-secondary-light opacity-60">P: {meal.protein}g</span>
                                            <span className="text-[10px] font-bold text-text-secondary-light opacity-60">C: {meal.carbs}g</span>
                                            <span className="text-[10px] font-bold text-text-secondary-light opacity-60">F: {meal.fat}g</span>
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight className="w-5 h-5 text-slate-300" />
                            </Card>
                        ))}
                    </div>
                </section>

                <Button variant="secondary" className="w-full border-dashed py-4 rounded-2xl font-bold gap-2">
                    <PieChart className="w-5 h-5" /> Detailed Macro Analysis
                </Button>
            </div>
        </Layout>
    );
};

export default Diet;
