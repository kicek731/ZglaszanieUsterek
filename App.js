import React, { createContext, useState, useContext } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as PaperProvider } from 'react-native-paper';


import AppNavigator from './src/navigation/AppNavigator';

// 1. Inicjalizacja QueryClient dla TanStack Query
const queryClient = new QueryClient();

// 2. Utworzenie kontekstu autoryzacji (Context API)
export const AuthContext = createContext({
    user: null,
    login: () => {},
    logout: () => {},
});

export default function App() {
    // Stan przechowujący dane zalogowanego użytkownika (domyślnie Łukasz jako admin)
    const [user, setUser] = useState({ name: 'Łukasz', role: 'admin' });

    const login = (username, role) => {
        setUser({ name: username, role: role });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <QueryClientProvider client={queryClient}>
            <AuthContext.Provider value={{ user, login, logout }}>
                <PaperProvider>
                    <SafeAreaProvider>
                        {/* BRAKUJĄCY KONTENER NAWIGACJI: */}
                        <NavigationContainer>
                            <AppNavigator />
                        </NavigationContainer>
                    </SafeAreaProvider>
                </PaperProvider>
            </AuthContext.Provider>
        </QueryClientProvider>
    );
}

// Custom hook do łatwego korzystania z AuthContext w innych plikach
export const useAuth = () => useContext(AuthContext);