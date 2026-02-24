import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShieldCheck, Zap, Star, Layout as LayoutIcon, HelpCircle, ArrowRight } from 'lucide-react';
import { Layout } from '../../components/layout/Layout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

const Subscription = () => {
    const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');
    const [selectedPlan, setSelectedPlan] = useState<'basic' | 'vip'>('vip');
    const [showSuccess, setShowSuccess] = useState(false);

    const plans = [
        {
            id: 'basic',
            name: 'Basic',
            price: 0,
            desc: 'Essential tools to start',
            features: ['Personalized Dashboard', 'Standard Workout Plans', 'Water Tracker'],
            color: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
        },
        {
            id: 'vip',
            name: 'Golden VIP',
            price: billing === 'monthly' ? 19.99 : 14.99,
            desc: 'Complete transformation toolset',
            features: ['Full Exercise Video Library', 'Custom Diet Plans', '1-on-1 Support', 'Progress Analysis', 'Ad-Free Experience'],
            color: 'bg-primary-light text-white shadow-xl shadow-primary-light/20'
        }
    ];

    const handleSubscribe = () => {
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    return (
        <Layout>
            <div className="space-y-6">
                <section className="text-center py-4">
                    <Badge variant="primary" className="mb-2">Subscription</Badge>
                    <h1 className="text-3xl font-black text-text-primary-light dark:text-text-primary-dark tracking-tight">
                        Level Up Your Game
                    </h1>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark px-6 mt-2">
                        Unlock exclusive features and expert guidance to reach your goals faster.
                    </p>
                </section>

                {/* Billing Toggle */}
                <section className="flex justify-center">
                    <div className="bg-surface-light dark:bg-surface-dark border border-slate-100 dark:border-slate-800 p-1 rounded-2xl flex relative w-64">
                        <motion.div
                            className="absolute h-[calc(100%-8px)] bg-white dark:bg-slate-700 rounded-xl shadow-sm z-0"
                            animate={{ x: billing === 'monthly' ? 0 : '100%' }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            style={{ width: 'calc(50% - 4px)' }}
                        />
                        <button
                            onClick={() => setBilling('monthly')}
                            className={`flex-1 py-2 text-xs font-black uppercase tracking-wider z-10 transition-colors ${billing === 'monthly' ? 'text-primary-light' : 'text-slate-400'}`}
                        >
                            Monthly
                        </button>
                        <button
                            onClick={() => setBilling('yearly')}
                            className={`flex-1 py-2 text-xs font-black uppercase tracking-wider z-10 transition-colors ${billing === 'yearly' ? 'text-primary-light' : 'text-slate-400'}`}
                        >
                            Yearly <span className="text-[8px] bg-success/10 text-success px-1.5 py-0.5 rounded-full ml-1">-25%</span>
                        </button>
                    </div>
                </section>

                {/* Pricing Cards */}
                <section className="space-y-4">
                    {plans.map((plan) => (
                        <Card
                            key={plan.id}
                            onClick={() => setSelectedPlan(plan.id as 'basic' | 'vip')}
                            className={`relative p-6 border-2 transition-all duration-300 ${selectedPlan === plan.id ? 'border-primary-light ring-4 ring-primary-light/10 transform scale-[1.02]' : 'border-transparent'}`}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-black italic">{plan.name}</h3>
                                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark font-medium">{plan.desc}</p>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-1 justify-end">
                                        <span className="text-sm font-bold opacity-60">$</span>
                                        <span className="text-3xl font-black tracking-tighter">{plan.price}</span>
                                    </div>
                                    <p className="text-[10px] font-black uppercase text-slate-400 italic">Per Month</p>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {plan.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${plan.id === 'vip' ? 'bg-primary-light text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span className="text-sm font-semibold opacity-90">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            {plan.id === 'vip' && (
                                <div className="absolute -top-3 -right-3 bg-warning text-white p-2 rounded-xl shadow-lg rotate-12">
                                    <Star className="w-5 h-5 fill-white" />
                                </div>
                            )}
                        </Card>
                    ))}
                </section>

                {/* CTA */}
                <section className="pt-4 pb-10">
                    <Button
                        className="w-full py-6 rounded-[24px] text-lg font-bold shadow-2xl flex gap-3"
                        onClick={handleSubscribe}
                    >
                        Upgrade to {selectedPlan === 'vip' ? 'VIP' : 'Basic'}
                        <ArrowRight className="w-5 h-5" />
                    </Button>
                    <p className="text-[10px] text-center text-text-secondary-light mt-4 px-10">
                        Payment will be charged to your account. You can cancel anytime in settings.
                    </p>
                </section>

                {/* FAQ Accordion Preview */}
                <section className="space-y-4">
                    <h2 className="text-lg font-bold tracking-tight border-b border-slate-100 dark:border-slate-800 pb-2">Common Questions</h2>
                    <div className="space-y-2">
                        <details className="group">
                            <summary className="list-none flex justify-between items-center p-4 bg-surface-light dark:bg-surface-dark rounded-2xl cursor-pointer">
                                <span className="font-bold text-sm">Can I switch plans later?</span>
                                <HelpCircle className="w-4 h-4 text-slate-300" />
                            </summary>
                            <div className="px-4 py-3 text-xs text-text-secondary-light leading-relaxed">
                                Yes, you can upgrade or downgrade your plan at any time through your profile settings. Changes take effect on the next billing cycle.
                            </div>
                        </details>
                    </div>
                </section>
            </div>

            {/* Success Simulation Overlay */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-primary-light flex flex-col items-center justify-center text-white p-10 text-center"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', damping: 10 }}
                            className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6"
                        >
                            <ShieldCheck className="w-12 h-12" />
                        </motion.div>
                        <h2 className="text-4xl font-black mb-4">Welcome to VIP!</h2>
                        <p className="text-white/80 font-bold">Your subscription is active. Let's start your elite transformation!</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </Layout>
    );
};

export default Subscription;
