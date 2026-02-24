import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle2, Info, ChevronRight, Clock, Zap } from 'lucide-react';
import { Layout } from '../../components/layout/Layout';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Exercise } from '../../types';
import { mockApi } from '../../services/mockApi';

const Training = () => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [completedExercises, setCompletedExercises] = useState<string[]>([]);

    useEffect(() => {
        mockApi.getExercises().then((data) => {
            setExercises(data);
            setIsLoading(false);
        });
    }, []);

    const toggleComplete = (id: string) => {
        setCompletedExercises(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    return (
        <Layout>
            <div className="space-y-6">
                {/* Header */}
                <section>
                    <h1 className="text-3xl font-black text-text-primary-light dark:text-text-primary-dark tracking-tight">
                        Workout Plan
                    </h1>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                        Today is focused on your Upper Body
                    </p>
                </section>

                {/* Weekly Calendar View */}
                <section className="flex justify-between items-center py-2 overflow-x-auto no-scrollbar gap-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                        const isToday = i === 0; // Mock current day
                        return (
                            <div key={day} className="flex flex-col items-center gap-2">
                                <span className="text-[10px] font-bold uppercase text-text-secondary-light dark:text-text-secondary-dark">{day}</span>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black transition-all ${isToday ? 'bg-primary-light text-white shadow-lg scale-110' : 'bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-800 opacity-60'}`}>
                                    {23 + i}
                                </div>
                            </div>
                        );
                    })}
                </section>

                {/* Today's Summary */}
                <section>
                    <Card className="bg-slate-50 dark:bg-slate-800/50 border-none p-4 flex gap-6 items-center">
                        <div className="flex-1 flex justify-around">
                            <div className="text-center">
                                <p className="text-[10px] font-black uppercase text-text-secondary-light">Exercises</p>
                                <p className="text-xl font-black">{exercises.length}</p>
                            </div>
                            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2" />
                            <div className="text-center">
                                <p className="text-[10px] font-black uppercase text-text-secondary-light">Target</p>
                                <p className="text-xl font-black">45 min</p>
                            </div>
                            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 mx-2" />
                            <div className="text-center">
                                <p className="text-[10px] font-black uppercase text-text-secondary-light">Burn</p>
                                <p className="text-xl font-black text-error">320 kcal</p>
                            </div>
                        </div>
                    </Card>
                </section>

                {/* Exercise List */}
                <section className="space-y-3">
                    <h2 className="text-xl font-bold tracking-tight px-1">Exercise List</h2>
                    {isLoading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-24 bg-slate-100 dark:bg-slate-800 rounded-2xl animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        exercises.map((ex) => (
                            <Card
                                key={ex.id}
                                onClick={() => setSelectedExercise(ex)}
                                className={`p-3 flex items-center gap-4 group transition-all cursor-pointer ${completedExercises.includes(ex.id) ? 'opacity-60 grayscale' : ''}`}
                            >
                                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-200">
                                    <img src={ex.thumbnailUrl} alt={ex.name.en} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Play className="w-6 h-6 text-white fill-white" />
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <h4 className="font-bold text-sm">{ex.name.en}</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] font-bold text-primary-light uppercase">{ex.sets} Sets</span>
                                        <span className="text-[10px] font-bold text-text-secondary-light uppercase">• {ex.reps.gainMuscle} Reps</span>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleComplete(ex.id);
                                        }}
                                        className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all active:scale-90 ${completedExercises.includes(ex.id) ? 'bg-success border-success text-white' : 'border-slate-200 dark:border-slate-700 text-slate-300'}`}
                                    >
                                        <CheckCircle2 className="w-6 h-6" />
                                    </button>
                                </div>
                            </Card>
                        ))
                    )}
                </section>
            </div>

            {/* Exercise Detail Modal */}
            <Modal
                isOpen={!!selectedExercise}
                onClose={() => setSelectedExercise(null)}
                title={selectedExercise?.name.en}
                fullScreen
            >
                {selectedExercise && (
                    <div className="space-y-6 pb-20">
                        {/* Video Placeholder */}
                        <div className="aspect-video w-full bg-slate-900 rounded-[30px] flex items-center justify-center relative overflow-hidden group">
                            <img src={selectedExercise.photoUrl} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="Video" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center text-white shadow-2xl animate-pulse">
                                    <Play className="w-8 h-8 fill-white ml-1" />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Badge variant="primary">{selectedExercise.difficulty}</Badge>
                            {selectedExercise.targetMuscle.map(m => (
                                <Badge key={m} variant="outline">{m}</Badge>
                            ))}
                        </div>

                        <section className="space-y-3">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Zap className="w-5 h-5 text-warning" /> Instructions
                            </h3>
                            <div className="space-y-4">
                                {selectedExercise.instructions.map((inst, i) => (
                                    <div key={i} className="flex gap-4 p-4 bg-surface-light dark:bg-surface-dark rounded-2xl border border-slate-100 dark:border-slate-800">
                                        <div className="w-6 h-6 rounded-full bg-primary-light/10 text-primary-light flex items-center justify-center font-black shrink-0">
                                            {i + 1}
                                        </div>
                                        <p className="text-sm text-text-primary-light dark:text-text-primary-dark leading-relaxed">
                                            {inst.en}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="space-y-3">
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <Info className="w-5 h-5 text-primary-light" /> Pro Tips
                            </h3>
                            <div className="p-4 bg-primary-light/5 border border-primary-light/10 rounded-2xl italic text-sm text-text-secondary-light dark:text-text-secondary-dark">
                                {selectedExercise.tips[0].en}
                            </div>
                        </section>

                        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-lg border-t border-slate-100 dark:border-slate-800 z-50">
                            <div className="max-w-md mx-auto flex gap-3">
                                <div className="flex-1 p-3 bg-surface-light dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
                                    <p className="text-[10px] font-black uppercase text-slate-400">Sets</p>
                                    <p className="text-lg font-black">{selectedExercise.sets}</p>
                                </div>
                                <div className="flex-2 p-3 bg-surface-light dark:bg-surface-dark rounded-2xl border border-slate-200 dark:border-slate-700 text-center">
                                    <p className="text-[10px] font-black uppercase text-slate-400">Reps (Muscle Gain)</p>
                                    <p className="text-lg font-black">{selectedExercise.reps.gainMuscle}</p>
                                </div>
                                <div className="flex-1 p-3 bg-slate-900 rounded-2xl text-center text-white">
                                    <p className="text-[10px] font-black uppercase text-slate-500">Rest</p>
                                    <p className="text-lg font-black">{selectedExercise.restSeconds}s</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </Layout>
    );
};

export default Training;
