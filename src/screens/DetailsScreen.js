import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { Text, Button, Card, Paragraph, Title, Badge } from 'react-native-paper';

export default function DetailsScreen({ route, navigation }) {
  const incident = route.params?.incident;

  if (!incident) {
    return (
        <View style={styles.center}>
          <Text style={styles.errorText}>Nie znaleziono szczegółów usterki.</Text>
        </View>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Nowe': return '#df4759';
      case 'W trakcie': return '#ffc107';
      case 'Naprawione': return '#28a745';
      default: return 'gray';
    }
  };

  return (
      <ScrollView contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.headerRow}>
              <Title style={styles.title}>{incident.title}</Title>
              <Badge style={[styles.badge, { backgroundColor: getStatusColor(incident.status) }]}>
                {incident.status}
              </Badge>
            </View>

            <Text style={styles.label}>Opis usterki:</Text>
            <Paragraph style={styles.description}>
              {incident.description || 'Brak dodatkowego opisu dla tego zgłoszenia.'}
            </Paragraph>

            {incident.photoUri && (
                <View style={styles.imageContainer}>
                  <Text style={styles.label}>Załączone zdjęcie:</Text>
                  <Image
                      source={{ uri: incident.photoUri }}
                      style={styles.image}
                  />
                </View>
            )}
          </Card.Content>
        </Card>

        <Button
            mode="contained"
            style={styles.button}
            onPress={() => navigation.navigate('EditStatus', { incident })}
        >
          Edytuj status usterki
        </Button>

        <Button
            mode="outlined"
            style={styles.backButton}
            onPress={() => navigation.goBack()}
        >
          Powrót do listy
        </Button>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    flexGrow: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  card: {
    marginBottom: 20,
    elevation: 3,
    backgroundColor: 'white',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    flexWrap: 'wrap',
    gap: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    flex: 1,
  },
  badge: {
    color: 'white',
    paddingHorizontal: 12,
    fontSize: 14,
    height: 26,
    borderRadius: 13,
    textAlignVertical: 'center',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginTop: 15,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
    lineHeight: 22,
  },
  imageContainer: {
    marginTop: 15,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 5,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#6200ee',
  },
  backButton: {
    marginTop: 10,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  }
});