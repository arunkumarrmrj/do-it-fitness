import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email('Please enter a valid email'),
});

export const profileSchema = z.object({
    firstName: z.string().min(2, 'Must be at least 2 characters').max(50),
    lastName: z.string().min(2, 'Must be at least 2 characters').max(50),
    email: z.string().email('Please enter a valid email'),
    phone: z.string().regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Invalid phone number'),
    gender: z.enum(['male', 'female', 'other']),
    weight: z.number().min(30, 'Weight must be at least 30kg').max(300),
    height: z.number().min(100, 'Height must be at least 100cm').max(250),
    birthDate: z.string().refine((val) => {
        const date = new Date(val);
        const now = new Date();
        const age = now.getFullYear() - date.getFullYear();
        return age >= 12 && age <= 100;
    }, 'Age must be between 12 and 100'),
    goal: z.enum(['loseWeight', 'gainMuscle', 'gainWeight']),
    activityLevel: z.enum(['sedentary', 'light', 'moderate', 'active', 'veryActive']),
});

export const subscriptionSchema = z.object({
    planType: z.enum(['basic', 'vip']),
    cardNumber: z.string().length(16, 'Card number must be 16 digits'),
    expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Format MM/YY'),
    cvv: z.string().length(3, 'CVV must be 3 digits'),
});
