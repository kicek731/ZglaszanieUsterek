import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Image, ScrollView, LogBox } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// Ukrywamy systemowe powiadomienie deweloperskie o przekazywaniu funkcji w nawigacji
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

export default function FormScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [locationData, setLocationData] = useState(null);
  const [locationDesc, setLocationDesc] = useState('');
  const queryClient = useQueryClient();

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
      setLocationData(null);
      setLocationDesc('');
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
      attachments,
      location: locationData ? { ...locationData, details: locationDesc } : null
    });
  };

  const removeAttachment = (id) => setAttachments((prev) => prev.filter((item) => item.id !== id));

  return (
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <Text style={styles.text}>Zgłoś usterkę</Text>

            <TextInput style={styles.input} placeholder="Tytuł usterki" value={title} onChangeText={setTitle} />
            <TextInput style={[styles.input, { height: 80, textAlignVertical: 'top' }]} placeholder="Opis problemu" value={description} onChangeText={setDescription} multiline />

            {/* Otwieramy mapę i przekazujemy jej sposób na powrót z danymi */}
            <Button
                mode="outlined"
                icon="map-marker"
                style={styles.toolButton}
                onPress={() => navigation.navigate('Location', {
                  onLocationSelected: (loc) => setLocationData(loc)
                })}
            >
              {locationData ? 'Zmień lokalizację GPS' : 'Dodaj lokalizację GPS'}
            </Button>

            {locationData && (
                <View style={styles.locationBox}>
                  <Text style={{fontWeight: 'bold'}}>📍 {locationData.address}</Text>
                  <TextInput
                      style={styles.descInput}
                      placeholder="Szczegóły (np. 2 piętro, sala 104)"
                      value={locationDesc}
                      onChangeText={setLocationDesc}
                  />
                </View>
            )}

            {/* Otwieramy aparat i przekazujemy sposób na odesłanie pliku */}
            <Button
                mode="outlined"
                icon="camera"
                style={styles.toolButton}
                onPress={() => navigation.navigate('Camera', {
                  onMediaCaptured: (newMedia) => setAttachments(prev => [...prev, newMedia])
                })}
            >
              Dodaj zdjęcie lub wideo
            </Button>

            {attachments.length > 0 && (
                <View style={styles.previewContainer}>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                    {attachments.map((item) => (
                        <View key={item.id} style={styles.mediaWrapper}>
                          {item.type === 'photo' ? (
                              <Image source={{ uri: item.uri }} style={styles.thumbnail} />
                          ) : (
                              <View style={[styles.thumbnail, styles.videoThumbnail]}><Text style={{ fontSize: 24 }}>🎬</Text></View>
                          )}
                          <IconButton icon="close-circle" iconColor="red" size={20} style={styles.deleteIcon} onPress={() => removeAttachment(item.id)} />
                        </View>
                    ))}
                  </ScrollView>
                </View>
            )}

            <Button mode="contained" onPress={handleSubmit} loading={mutation.isPending} disabled={mutation.isPending || !title} style={{ marginTop: 20, width: '90%' }}>
              Dodaj zgłoszenie
            </Button>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: { flexGrow: 1, alignItems: 'center', paddingVertical: 20, backgroundColor: '#f5f5f5' },
  text: { fontSize: 20, marginBottom: 20, fontWeight: 'bold' },
  input: { width: '90%', backgroundColor: 'white', padding: 10, marginBottom: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 },
  toolButton: { width: '90%', marginBottom: 10 },
  locationBox: { width: '90%', backgroundColor: '#e6f2ff', padding: 10, borderRadius: 5, marginBottom: 15, borderWidth: 1, borderColor: '#b3d9ff' },
  descInput: { backgroundColor: 'white', padding: 8, marginTop: 10, borderRadius: 4, borderWidth: 1, borderColor: '#ccc' },
  previewContainer: { height: 110, width: '90%', marginBottom: 5 },
  scrollContent: { flexDirection: 'row', alignItems: 'center', paddingRight: 20 },
  mediaWrapper: { position: 'relative', marginRight: 15, marginTop: 10 },
  thumbnail: { width: 85, height: 85, borderRadius: 8, borderWidth: 1, borderColor: '#ccc' },
  videoThumbnail: { backgroundColor: '#333', justifyContent: 'center', alignItems: 'center' },
  deleteIcon: { position: 'absolute', top: -18, right: -18, margin: 0 }
});