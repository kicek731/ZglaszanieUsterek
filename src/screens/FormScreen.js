import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Image // <-- Nowy import do wyświetlania zdjęć
} from 'react-native';
import { Button } from 'react-native-paper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function FormScreen({ route, navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null); // Stan trzymający zrobione zdjęcie
  const queryClient = useQueryClient();

  // Nasłuchujemy, czy aparat (CameraScreen) odesłał nam zdjęcie
  useEffect(() => {
    if (route.params?.photoUri) {
      setPhoto(route.params.photoUri);
    }
  }, [route.params?.photoUri]);

  const mutation = useMutation({
    mutationFn: async (newIncident) => {
      const response = await axios.post('http://172.20.10.6:3000/incidents', newIncident);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['incidents'] });
      // Czyścimy formularz po udanym wysłaniu
      setTitle('');
      setDescription('');
      setPhoto(null);
      navigation.navigate('Zgłoszenia', { screen: 'List' });
    },
  });

  const handleSubmit = () => {
    if (!title) return;
    mutation.mutate({
      id: Date.now().toString(),
      title,
      description,
      status: 'Nowe',
      photoUri: photo // Wysyłamy zdjęcie do bazy danych
    });
  };

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

            {/* Przycisk otwierający aparat */}
            <Button
                mode="outlined"
                icon="camera"
                onPress={() => navigation.navigate('Camera')}
                style={{ width: '80%', marginBottom: 15 }}
            >
              Zrób zdjęcie usterki
            </Button>

            {/* Jeśli zdjęcie zostało zrobione, pokazujemy jego miniaturkę */}
            {photo && (
                <Image
                    source={{ uri: photo }}
                    style={styles.imagePreview}
                />
            )}

            <Button
                mode="contained"
                onPress={handleSubmit}
                loading={mutation.isPending}
                disabled={mutation.isPending || !title}
                style={{ marginTop: 10, width: '80%' }}
            >
              {mutation.isPending ? "Wysyłanie..." : "Dodaj zgłoszenie"}
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
  },
  imagePreview: {
    width: 200,
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ccc'
  }
});