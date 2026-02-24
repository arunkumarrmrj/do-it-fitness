import { Exercise, UserProfile, DietPlan } from '../types';
import exercises from '../data/mocks/exercises.json';

/**
 * Simulated API service
 */
export const mockApi = {
    /**
     * Fetch all exercises
     */
    getExercises: async (): Promise<Exercise[]> => {
        await new Promise(resolve => setTimeout(resolve, 800));
        return exercises as unknown as Exercise[];
    },

    /**
     * Get personalized plan
     */
    getPersonalizedPlan: async (profile: UserProfile): Promise<{ diet: DietPlan; training: any }> => {
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Simple mock logic for plan generation
        return {
            diet: {
                id: 'plan-1',
                goal: profile.goal,
                meals: [],
                dailyCalories: 2200,
                macros: { protein: 150, carbs: 250, fats: 70 },
                hydration: 2.5
            },
            training: {
                id: 'train-1',
                days: []
            }
        };
    }
};
