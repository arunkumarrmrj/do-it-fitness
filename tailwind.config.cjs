/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#3b82f6', // blue-500
                    dark: '#60a5fa',  // blue-400
                },
                background: {
                    light: '#ffffff',
                    dark: '#0f172a', // slate-900
                },
                surface: {
                    light: '#f8fafc', // slate-50
                    dark: '#1e293b',  // slate-800
                },
                text: {
                    primary: {
                        light: '#0f172a', // slate-900
                        dark: '#f1f5f9',  // slate-100
                    },
                    secondary: {
                        light: '#475569', // slate-600
                        dark: '#94a3b8',  // slate-400
                    }
                },
                success: '#22c55e', // green-500
                warning: '#f59e0b', // amber-500
                error: '#ef4444',   // red-500
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
