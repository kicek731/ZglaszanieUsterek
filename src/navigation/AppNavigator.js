import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Ekrany Autoryzacji
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Ekrany Główne
import ListScreen from '../screens/ListScreen';
import DetailsScreen from '../screens/DetailsScreen';
import EditStatusScreen from '../screens/EditStatusScreen';
import FormScreen from '../screens/FormScreen';
import CameraScreen from '../screens/CameraScreen';
import LocationScreen from '../screens/LocationScreen'; // NOWY EKRAN GPS
import ProfileScreen from '../screens/ProfileScreen';
import AboutScreen from '../screens/AboutScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stos 1: Zgłoszenia
function IssuesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="List" component={ListScreen} options={{ title: 'Moje Zgłoszenia' }} />
            <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Szczegóły usterki' }} />
            <Stack.Screen name="EditStatus" component={EditStatusScreen} options={{ title: 'Edytuj status' }} />
        </Stack.Navigator>
    );
}

// Stos 2: Nowe zgłoszenie (Formularz -> Aparat / GPS)
function NewIssueStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Form" component={FormScreen} options={{ title: 'Zgłoś usterkę' }} />
            <Stack.Screen name="Camera" component={CameraScreen} options={{ title: 'Zrób zdjęcie', headerShown: false }} />
            <Stack.Screen name="Location" component={LocationScreen} options={{ title: 'Pobierz Lokalizację' }} />
        </Stack.Navigator>
    );
}

// Stos 3: Profil
function ProfileStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
            <Stack.Screen name="About" component={AboutScreen} options={{ title: 'O aplikacji' }} />
        </Stack.Navigator>
    );
}

// Główne Zakładki Aplikacji (Bottom Tabs)
function MainTabs() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Zgłoszenia') iconName = 'format-list-bulleted';
                    else if (route.name === 'Dodaj') iconName = 'plus-circle';
                    else if (route.name === 'Konto') iconName = 'account-circle';
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Zgłoszenia" component={IssuesStack} />
            <Tab.Screen name="Dodaj" component={NewIssueStack} />
            <Tab.Screen
                name="Konto"
                component={ProfileStack}
                options={{ unmountOnBlur: true }} // <--- Ta flaga wymusza czyszczenie historii stosu po zmianie zakładki
            />
        </Tab.Navigator>
    );
}

// GŁÓWNY KONTROLER: Logowanie -> Aplikacja
export default function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            {/* Po zalogowaniu wchodzimy w MainApp */}
            <Stack.Screen name="MainApp" component={MainTabs} />
        </Stack.Navigator>
    );
}