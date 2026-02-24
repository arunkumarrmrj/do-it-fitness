export type UserGoal = 'loseWeight' | 'gainMuscle' | 'gainWeight';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'veryActive';
export type Gender = 'male' | 'female' | 'other';

export interface LocalizedString {
    en: string;
    ar: string;
}

export interface UserProfile {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: Gender;
    birthDate: string;
    weight: number;
    height: number;
    goal: UserGoal;
    activityLevel: ActivityLevel;
    profilePhotoUrl?: string;
    progressVideos?: string[];
    preferences: {
        language: 'en' | 'ar';
        theme: 'light' | 'dark' | 'system';
        notifications: boolean;
    };
    subscription?: {
        type: 'basic' | 'vip';
        startDate: string;
        endDate: string;
    };
}

export interface Exercise {
    id: string;
    name: LocalizedString;
    targetMuscle: string[];
    equipment: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    sets: number;
    reps: {
        loseWeight: string;
        gainMuscle: string;
        gainWeight: string;
    };
    restSeconds: number;
    instructions: LocalizedString[];
    tips: LocalizedString[];
    photoUrl: string;
    videoUrl: string;
    thumbnailUrl: string;
}

export interface Meal {
    id: string;
    name: LocalizedString;
    type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
    calories: number;
    macros: {
        protein: number;
        carbs: number;
        fats: number;
    };
    ingredients: LocalizedString[];
    instructions: LocalizedString[];
    photoUrl: string;
}

export interface DietPlan {
    id: string;
    goal: UserGoal;
    meals: Meal[];
    dailyCalories: number;
    macros: {
        protein: number;
        carbs: number;
        fats: number;
    };
    hydration: number;
}
