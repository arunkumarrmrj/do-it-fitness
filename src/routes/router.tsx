import { Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Onboarding Pages
import Splash from '@/pages/onboarding/Splash';
import Welcome from '@/pages/onboarding/Welcome';
import Register from '@/pages/onboarding/Register';
import GoalSelection from '@/pages/onboarding/GoalSelection';
import MediaUpload from '@/pages/onboarding/MediaUpload';

// Auth Pages
import Dashboard from '@/pages/dashboard/Dashboard';
import Training from '@/pages/training/Training';
import Diet from '@/pages/diet/Diet';
import Subscription from '@/pages/subscription/Subscription';

import { ProtectedRoute } from '@/routes/ProtectedRoute';

const AppRoutes = () => {
    return (
        <AnimatePresence mode="wait">
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Splash />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/register" element={<Register />} />
                <Route path="/register/goal" element={<GoalSelection />} />
                <Route path="/register/media" element={<MediaUpload />} />

                {/* Protected Routes */}
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/training"
                    element={
                        <ProtectedRoute>
                            <Training />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/diet"
                    element={
                        <ProtectedRoute>
                            <Diet />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/subscription"
                    element={
                        <ProtectedRoute>
                            <Subscription />
                        </ProtectedRoute>
                    }
                />

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AppRoutes;
