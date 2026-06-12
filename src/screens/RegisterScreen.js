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

export default function RegisterScreen({ navigation }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = () => {
        // Po udanej rejestracji przenosimy na ekran logowania lub od razu do aplikacji
        navigation.replace('MainApp');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Title style={styles.title}>Utwórz konto</Title>
                    <Text style={styles.subtitle}>Dołącz do systemu zgłoszeń</Text>

                    <TextInput
                        label="Imię i nazwisko"
                        mode="outlined"
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                    />

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
                        onPress={handleRegister}
                        style={styles.button}
                        disabled={!name || !email || !password}
                    >
                        Zarejestruj
                    </Button>

                    <Button
                        mode="text"
                        onPress={() => navigation.navigate('Login')}
                    >
                        Masz już konto? Zaloguj się
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