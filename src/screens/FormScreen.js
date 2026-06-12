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
  Image,
  ScrollView
} from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function FormScreen({ route, navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState([]);
  const queryClient = useQueryClient();

  // Nasłuchujemy na kompletną, zaktualizowaną listę przysłaną z aparatu
  useEffect(() => {
    if (route.params?.updatedAttachments) {
      setAttachments(route.params.updatedAttachments);
      // Czyszczenie parametru, aby uniknąć zapętlenia ponownych renderów
      navigation.setParams({ updatedAttachments: undefined });
    }
  }, [route.params?.updatedAttachments]);

  const mutation = useMutation({
    mutationFn: async (newIncident) => {
      const response = await axios.post('http://172.20.10.6:3000/incidents', newIncident);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['incidents'] });
      setTitle('');
      setDescription('');
      setAttachments([]);
      // NAPRAWA BŁĘDU: Przekierowanie bezpośrednio do ekranu głównego 'List'
      navigation.navigate('List');
    },
  });

  const handleSubmit = () => {
    if (!title) return;
    mutation.mutate({
      id: Date.now().toString(),
      title,
      description,
      status: 'Nowe',
      attachments: attachments
    });
  };

  const removeAttachment = (id) => {
    setAttachments((prev) => prev.filter((item) => item.id !== id));
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

            <Button
                mode="outlined"
                icon="camera"
                // Przekazujemy aktualną listę do aparatu, by jej nie stracić
                onPress={() => navigation.navigate('Camera', { existingAttachments: attachments })}
                style={{ width: '80%', marginBottom: 15 }}
            >
              Dodaj zdjęcie lub wideo
            </Button>

            {attachments.length > 0 && (
                <View style={styles.previewContainer}>
                  <ScrollView
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.scrollContent}
                  >
                    {attachments.map((item) => (
                        <View key={item.id} style={styles.mediaWrapper}>
                          {item.type === 'photo' ? (
                              <Image source={{ uri: item.uri }} style={styles.thumbnail} />
                          ) : (
                              <View style={[styles.thumbnail, styles.videoThumbnail]}>
                                <Text style={{ fontSize: 24 }}>🎬</Text>
                                <Text style={{ fontSize: 10, color: 'white', fontWeight: 'bold' }}>WIDEO</Text>
                              </View>
                          )}
                          <IconButton
                              icon="close-circle"
                              iconColor="red"
                              size={20}
                              style={styles.deleteIcon}
                              onPress={() => removeAttachment(item.id)}
                          />
                        </View>
                    ))}
                  </ScrollView>
                </View>
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
  previewContainer: {
    height: 110,
    width: '80%',
    marginBottom: 15,
  },
  scrollContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
  },
  mediaWrapper: {
    position: 'relative',
    marginRight: 15,
    marginTop: 10,
  },
  thumbnail: {
    width: 85,
    height: 85,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  videoThumbnail: {
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteIcon: {
    position: 'absolute',
    top: -18,
    right: -18,
    margin: 0,
  }
});