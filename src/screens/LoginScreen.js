import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { Button, TextInput, Title, Text } from 'react-native-paper';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {

        navigation.replace('MainApp');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Title style={styles.title}>Witaj ponownie</Title>
                    <Text style={styles.subtitle}>Zaloguj się na swoje konto</Text>

                    <TextInput
                        label="Adres e-mail"
                        mode="outlined"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input}
                    />

                    <TextInput
                        label="Hasło"
                        mode="outlined"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                    />

                    <Button
                        mode="contained"
                        onPress={handleLogin}
                        style={styles.button}
                        disabled={!email || !password}
                    >
                        Zaloguj
                    </Button>

                    <Button
                        mode="text"
                        onPress={() => navigation.navigate('Register')}
                    >
                        Nie masz konta? Zarejestruj się
                    </Button>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        marginBottom: 15,
        backgroundColor: 'white',
    },
    button: {
        marginTop: 10,
        marginBottom: 20,
        paddingVertical: 5,
    }
});