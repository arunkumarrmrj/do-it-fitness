import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile, UserGoal, ActivityLevel } from '../types';

interface UserContextType {
    user: UserProfile | null;
    updateUser: (data: Partial<UserProfile>) => void;
    completeOnboarding: (profile: UserProfile) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile | null>(() => {
        const saved = localStorage.getItem('user_profile');
        return saved ? JSON.parse(saved) : null;
    });

    const updateUser = (data: Partial<UserProfile>) => {
        if (user) {
            const updated = { ...user, ...data };
            setUser(updated);
            localStorage.setItem('user_profile', JSON.stringify(updated));
        }
    };

    const completeOnboarding = (profile: UserProfile) => {
        setUser(profile);
        localStorage.setItem('user_profile', JSON.stringify(profile));
    };

    return (
        <UserContext.Provider value={{ user, updateUser, completeOnboarding }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
