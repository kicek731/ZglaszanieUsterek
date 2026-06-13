import React from 'react';
import { View, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { Text, Button, Card, Paragraph, Title, Badge, IconButton } from 'react-native-paper';
import { Video, ResizeMode } from 'expo-av';
import * as Clipboard from 'expo-clipboard';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function DetailsScreen({ route, navigation }) {
  const incident = route.params?.incident;
  const queryClient = useQueryClient();

  if (!incident) return <View style={styles.center}><Text style={styles.errorText}>Brak usterki.</Text></View>;

  const copyToClipboard = async (lat, lng) => {
    await Clipboard.setStringAsync(`${lat}, ${lng}`);
    alert("Skopiowano współrzędne do schowka!");
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Nowe': return '#df4759';
      case 'W trakcie': return '#ffc107';
      case 'Naprawione': return '#28a745';
      default: return 'gray';
    }
  };

  // Mutacja odpowiedzialna za usunięcie usterki z bazy API
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`http://172.20.10.6:3000/incidents/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['incidents'] });
      // Po udanym usunięciu wracamy do listy głównej
      navigation.goBack();
    },
  });

  // Funkcja wywołująca natywny Alert (zabezpieczenie przed pomyłką)
  const handleDelete = () => {
    Alert.alert(
        "Usuń zgłoszenie",
        "Czy na pewno chcesz bezpowrotnie usunąć to zgłoszenie z systemu?",
        [
          { text: "Anuluj", style: "cancel" },
          {
            text: "Usuń",
            style: "destructive",
            onPress: () => deleteMutation.mutate(incident.id)
          }
        ]
    );
  };

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.headerRow}>
              <Title style={styles.title}>{incident.title}</Title>
              <Badge style={[styles.badge, { backgroundColor: getStatusColor(incident.status) }]}>{incident.status}</Badge>
            </View>

            <Text style={styles.label}>Opis usterki:</Text>
            <Paragraph style={styles.description}>{incident.description || 'Brak dodatkowego opisu'}</Paragraph>

            {incident.location && (
                <View style={styles.locationContainer}>
                  <Text style={styles.label}>Miejsce usterki:</Text>
                  <Text style={styles.addressText}>📌 {incident.location.address}</Text>

                  {incident.location.details ? (
                      <Text style={styles.detailsText}>Komentarz: {incident.location.details}</Text>
                  ) : null}

                  <View style={styles.coordsRow}>
                    <Text style={styles.coordsText}>
                      {incident.location.latitude.toFixed(5)}, {incident.location.longitude.toFixed(5)}
                    </Text>
                    <IconButton
                        icon="content-copy"
                        size={20}
                        onPress={() => copyToClipboard(incident.location.latitude, incident.location.longitude)}
                    />
                  </View>
                </View>
            )}

            {incident.attachments && incident.attachments.map((item, index) => (
                <View key={item.id || index} style={styles.mediaContainer}>
                  <Text style={styles.label}>Załącznik {index + 1}:</Text>
                  {item.type === 'photo' ? (
                      <Image source={{ uri: item.uri }} style={styles.media} />
                  ) : (
                      <Video source={{ uri: item.uri }} useNativeControls resizeMode={ResizeMode.CONTAIN} style={styles.media} />
                  )}
                </View>
            ))}
          </Card.Content>
        </Card>

        <Button mode="contained" style={styles.button} onPress={() => navigation.navigate('EditStatus', { incident })}>
          Edytuj status usterki
        </Button>

        {/* NOWY PRZYCISK: Usuwanie usterki */}
        <Button
            mode="outlined"
            textColor="#df4759"
            style={[styles.backButton, { borderColor: '#df4759' }]}
            onPress={handleDelete}
            loading={deleteMutation.isPending}
            disabled={deleteMutation.isPending}
            icon="delete"
        >
          Usuń usterkę
        </Button>

        <Button mode="text" style={styles.backButton} onPress={() => navigation.goBack()}>
          Powrót do listy
        </Button>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f5f5f5', flexGrow: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: { marginBottom: 20, elevation: 3, backgroundColor: 'white' },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  title: { fontSize: 22, fontWeight: 'bold', flex: 1 },
  badge: { color: 'white', paddingHorizontal: 12, height: 26, borderRadius: 13, textAlignVertical: 'center' },
  label: { fontSize: 14, color: '#666', marginTop: 15, fontWeight: 'bold' },
  description: { fontSize: 16, color: '#333', marginTop: 5 },
  locationContainer: { marginTop: 15, padding: 10, backgroundColor: '#f0f8ff', borderRadius: 8, borderWidth: 1, borderColor: '#cce6ff' },
  addressText: { fontSize: 16, fontWeight: 'bold', marginTop: 5, color: '#0059b3' },
  detailsText: { fontSize: 14, marginTop: 5, fontStyle: 'italic', color: '#4d4d4d' },
  coordsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 5, backgroundColor: 'white', paddingHorizontal: 10, borderRadius: 5, borderWidth: 1, borderColor: '#ddd' },
  coordsText: { fontSize: 13, fontFamily: 'monospace', color: '#333' },
  mediaContainer: { marginTop: 15 },
  media: { width: '100%', height: 200, borderRadius: 8, marginTop: 5, backgroundColor: 'black' },
  button: { marginTop: 10, backgroundColor: '#6200ee' },
  backButton: { marginTop: 10 },
  errorText: { fontSize: 16, color: 'red' }
});