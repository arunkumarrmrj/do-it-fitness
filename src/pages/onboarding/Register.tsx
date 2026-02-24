import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, Ruler, Weight } from 'lucide-react';
import { profileSchema } from '../../lib/validators';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { useUser } from '../../contexts/UserContext';
import { UserProfile } from '../../types';

const Register = () => {
    const navigate = useNavigate();
    const { completeOnboarding } = useUser();

    const { register, handleSubmit, formState: { errors, isValid } } = useForm({
        resolver: zodResolver(profileSchema.omit({ goal: true, activityLevel: true })),
        mode: 'onChange'
    });

    const onSubmit = (data: any) => {
        // Save partial data and move to next step
        localStorage.setItem('temp_profile', JSON.stringify(data));
        navigate('/register/goal');
    };

    const steps = [
        { title: 'Personal Info', active: true },
        { title: 'Goal', active: false },
        { title: 'Media', active: false }
    ];

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark p-6 max-w-md mx-auto">
            <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                    <Button variant="ghost" onClick={() => navigate(-1)} className="px-0">
                        Back
                    </Button>
                    <div className="flex gap-2">
                        {steps.map((s, i) => (
                            <div
                                key={i}
                                className={`h-1.5 w-12 rounded-full transition-all ${s.active ? 'bg-primary-light dark:bg-primary-dark w-16' : 'bg-slate-200 dark:bg-slate-800'}`}
                            />
                        ))}
                    </div>
                </div>
                <h1 className="text-3xl font-black text-text-primary-light dark:text-text-primary-dark tracking-tight">
                    Create Profile
                </h1>
                <p className="text-text-secondary-light dark:text-text-secondary-dark mt-2">
                    Let's get to know you better to personalize your experience.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="First Name"
                        placeholder="John"
                        icon={<User className="w-4 h-4" />}
                        {...register('firstName')}
                        error={errors.firstName?.message as string}
                    />
                    <Input
                        label="Last Name"
                        placeholder="Doe"
                        icon={<User className="w-4 h-4" />}
                        {...register('lastName')}
                        error={errors.lastName?.message as string}
                    />
                </div>

                <Input
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                    icon={<Mail className="w-4 h-4" />}
                    {...register('email')}
                    error={errors.email?.message as string}
                />

                <Input
                    label="Phone Number"
                    placeholder="+1 234 567 8900"
                    icon={<Phone className="w-4 h-4" />}
                    {...register('phone')}
                    error={errors.phone?.message as string}
                />

                <div className="grid grid-cols-2 gap-4">
                    <Input
                        label="Weight (kg)"
                        type="number"
                        placeholder="75"
                        icon={<Weight className="w-4 h-4" />}
                        {...register('weight', { valueAsNumber: true })}
                        error={errors.weight?.message as string}
                    />
                    <Input
                        label="Height (cm)"
                        type="number"
                        placeholder="180"
                        icon={<Ruler className="w-4 h-4" />}
                        {...register('height', { valueAsNumber: true })}
                        error={errors.height?.message as string}
                    />
                </div>

                <Input
                    label="Birth Date"
                    type="date"
                    icon={<Calendar className="w-4 h-4" />}
                    {...register('birthDate')}
                    error={errors.birthDate?.message as string}
                />

                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Gender</label>
                    <div className="flex gap-4">
                        {['male', 'female', 'other'].map((g) => (
                            <label key={g} className="flex-1">
                                <input
                                    type="radio"
                                    value={g}
                                    className="hidden peer"
                                    {...register('gender')}
                                />
                                <div className="p-3 text-center rounded-xl border border-slate-200 dark:border-slate-800 peer-checked:border-primary-light peer-checked:bg-primary-light/5 dark:peer-checked:border-primary-dark transition-all cursor-pointer capitalize font-semibold">
                                    {g}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="pt-6">
                    <Button type="submit" className="w-full py-6 rounded-2xl text-lg font-bold" disabled={!isValid}>
                        Next Step
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Register;
