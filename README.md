# Do IT - Mobile App Prototype

A comprehensive, interactive mobile app prototype for "Do IT" - a personalized fitness and diet application.

## 🚀 Features

- **Personalized Onboarding**: Multi-step registration, goal selection, and physique photo upload.
- **Dynamic Dashboard**: Personalized greetings, quick stats (calories, water, streak), and activity previews.
- **Training Module**: Weekly workout calendar, exercise tracking with completion status, and detailed exercise modals with instructions and tips.
- **Diet Management**: Macro tracking, daily meal plans, and interactive water intake tracker.
- **Premium Experience**: VIP subscription flow with feature comparisons and billing toggles.
- **Advanced UI/UX**:
  - Full Dark/Light mode support.
  - Complete Internationalization (Arabic/English) with RTL layout switching.
  - Smooth animations using Framer Motion.
  - Mobile-first, production-grade component library.

## 🛠️ Tech Stack

- **Framework**: React 18+ with Vite
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 3+
- **Animations**: Framer Motion
- **State**: React Context API
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## 📦 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build Prototype**:
   ```bash
   npm run build
   ```

## 🏗️ Architecture

The project follows a modular structure:
- `/src/components`: UI library, layout components, and feature-specific blocks.
- `/src/contexts`: Application state management (Auth, Theme, Language, User).
- `/src/lib`: Core utilities for fitness calculations (BMI, BMR, TDEE) and form validators.
- `/src/pages`: Feature screens organized by domain.
- `/src/services`: Mock API layer for simulated data fetching.

## 🌍 Localization

The app supports English (LTR) and Arabic (RTL). Toggle language in the header to see dynamic layout adjustments and translated content.

---
*Developed as a high-fidelity prototype for stakeholder review.*
