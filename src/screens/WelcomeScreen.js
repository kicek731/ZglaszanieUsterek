import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Button, Text, Title } from 'react-native-paper';

export default function WelcomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.icon}>🛠️</Text>
                <Title style={styles.title}>System Zgłoszeń</Title>
                <Text style={styles.subtitle}>Zarządzaj usterkami w jednym miejscu</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button
                    mode="contained"
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                    onPress={() => navigation.navigate('Login')}
                >
                    Zaloguj się
                </Button>

                <Button
                    mode="outlined"
                    style={styles.button}
                    contentStyle={styles.buttonContent}
                    onPress={() => navigation.navigate('Register')}
                >
                    Zarejestruj się
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 60,
    },
    icon: {
        fontSize: 80,
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    buttonContainer: {
        width: '100%',
    },
    button: {
        marginBottom: 15,
        borderRadius: 8,
    },
    buttonContent: {
        paddingVertical: 8,
    }
});