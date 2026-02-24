import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { UserProvider } from '@/contexts/UserContext';
import AppRoutes from '@/routes/router';

function App() {
    return (
        <BrowserRouter basename="/fitness">
            <LanguageProvider>
                <ThemeProvider>
                    <AuthProvider>
                        <UserProvider>
                            <AppRoutes />
                        </UserProvider>
                    </AuthProvider>
                </ThemeProvider>
            </LanguageProvider>
        </BrowserRouter>
    );
}

export default App;
