import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import 8 ekranów
import ListScreen from '../screens/ListScreen';
import DetailsScreen from '../screens/DetailsScreen';
import EditStatusScreen from '../screens/EditStatusScreen';
import FormScreen from '../screens/FormScreen';
import CameraScreen from '../screens/CameraScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LevelScreen from '../screens/LevelScreen';
import AboutScreen from '../screens/AboutScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Stos 1: Zg³oszenia (Lista -> Szczegó³y -> Edycja)
function IssuesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={ListScreen} options={{ title: 'Moje Zg³oszenia' }} />
      <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Szczegó³y usterki' }} />
      <Stack.Screen name="EditStatus" component={EditStatusScreen} options={{ title: 'Edytuj status' }} />
    </Stack.Navigator>
  );
}

// Stos 2: Nowe zg³oszenie (Formularz -> Aparat)
function NewIssueStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Form" component={FormScreen} options={{ title: 'Zg³oœ usterkê' }} />
      <Stack.Screen name="Camera" component={CameraScreen} options={{ title: 'Zrób zdjêcie', headerShown: false }} />
    </Stack.Navigator>
  );
}

// Stos 3: Profil i narzêdzia (Profil -> Poziomica / O Aplikacji)
function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profil' }} />
      <Stack.Screen name="Level" component={LevelScreen} options={{ title: 'Poziomica' }} />
      <Stack.Screen name="About" component={AboutScreen} options={{ title: 'O aplikacji' }} />
    </Stack.Navigator>
  );
}

// G³ówny nawigator z zak³adkami (Bottom Tabs) ³¹cz¹cy powy¿sze stosy
export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Zg³oszenia') iconName = 'format-list-bulleted';
          else if (route.name === 'Dodaj') iconName = 'plus-circle';
          else if (route.name === 'Konto') iconName = 'account-circle';
          return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
        },
        headerShown: false, // Ukrywamy nag³ówek zak³adek, bo ka¿dy stos ma w³asny
      })}
    >
      <Tab.Screen name="Zg³oszenia" component={IssuesStack} />
      <Tab.Screen name="Dodaj" component={NewIssueStack} />
      <Tab.Screen name="Konto" component={ProfileStack} />
    </Tab.Navigator>
  );
}