import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Button } from 'react-native-paper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function FormScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const queryClient = useQueryClient();


  const mutation = useMutation({
    mutationFn: async (newIncident) => {
      const response = await axios.post('http://172.20.10.6:3000/incidents', newIncident);
      return response.data;
    },
    onSuccess: async () => {
      // Poprawka dla TanStack Query v5 - przekazujemy obiekt z queryKey
      await queryClient.invalidateQueries({ queryKey: ['incidents'] });
      navigation.navigate('Zgłoszenia', { screen: 'List' });
    },
  });

  const handleSubmit = () => {
    if (!title) return;
    mutation.mutate({
      id: Date.now().toString(),
      title,
      description,
      status: 'Nowe'
    });
  };


  // 1. Owijamy całość w KeyboardAvoidingView (dla iOS)
  // 2. TouchableWithoutFeedback chowa klawiaturę po kliknięciu w tło
  return (
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.text}>Ekran formularza</Text>

            <TextInput
                style={styles.input}
                placeholder="Tytuł usterki"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={[styles.input, { height: 80, textAlignVertical: 'top' }]}
                placeholder="Opis (opcjonalnie)"
                value={description}
                onChangeText={setDescription}
                multiline
            />

            <Button
                mode="contained"
                onPress={handleSubmit}
                loading={mutation.isPending}
                disabled={mutation.isPending || !title}
                style={{ marginTop: 10, width: '80%' }}
            >
              {mutation.isPending ? "Wysyłanie..." : "Dodaj zgłoszenie (POST)"}
            </Button>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  }
});