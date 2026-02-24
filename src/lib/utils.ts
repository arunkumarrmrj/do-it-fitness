import { UserProfile, UserGoal, ActivityLevel } from '../types';
import { format } from 'date-fns';
import { ar, enUS } from 'date-fns/locale';

/**
 * Calculates BMI (Body Mass Index)
 */
export const calculateBMI = (weightKg: number, heightCm: number): number => {
    const heightM = heightCm / 100;
    return parseFloat((weightKg / (heightM * heightM)).toFixed(1));
};

/**
 * Calculates BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
 */
export const calculateBMR = (profile: {
    weight: number;
    height: number;
    birthDate: string;
    gender: 'male' | 'female' | 'other'
}): number => {
    const age = new Date().getFullYear() - new Date(profile.birthDate).getFullYear();
    let bmr = 10 * profile.weight + 6.25 * profile.height - 5 * age;

    if (profile.gender === 'male') {
        bmr += 5;
    } else {
        bmr -= 161;
    }

    return Math.round(bmr);
};

/**
 * Calculates TDEE (Total Daily Energy Expenditure)
 */
export const calculateTDEE = (bmr: number, activityLevel: ActivityLevel): number => {
    const multipliers: Record<ActivityLevel, number> = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        veryActive: 1.9
    };

    return Math.round(bmr * multipliers[activityLevel]);
};

/**
 * Calculates daily calorie targets based on goal
 */
export const calculateDailyCalories = (tdee: number, goal: UserGoal): number => {
    switch (goal) {
        case 'loseWeight': return tdee - 500;
        case 'gainMuscle': return tdee + 300;
        case 'gainWeight': return tdee + 500;
        default: return tdee;
    }
};

/**
 * Calculates water intake in liters
 */
export const calculateWaterIntake = (weightKg: number, activityLevel: ActivityLevel): number => {
    let base = weightKg * 0.033;
    const activityBonus: Record<ActivityLevel, number> = {
        sedentary: 0,
        light: 0.3,
        moderate: 0.5,
        active: 0.8,
        veryActive: 1.0
    };

    return parseFloat((base + activityBonus[activityLevel]).toFixed(1));
};

/**
 * Formats date based on locale
 */
export const formatDate = (date: Date, locale: 'en' | 'ar'): string => {
    return format(date, 'PPPP', { locale: locale === 'ar' ? ar : enUS });
};
