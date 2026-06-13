import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Title, Card, Paragraph, Avatar } from 'react-native-paper';

export default function AboutScreen() {
  return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Avatar.Icon size={80} icon="information-variant" style={styles.icon} />
          <Title style={styles.title}>System Zg³oszeñ</Title>
          <Text style={styles.version}>Wersja 1.0.0</Text>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>O projekcie</Title>
            <Paragraph style={styles.paragraph}>
              Aplikacja mobilna s³u¿¹ca do precyzyjnego zg³aszania, monitorowania i zarz¹dzania usterkami w terenie.
              Projekt zosta³ zrealizowany z wykorzystaniem nowoczesnych technologii webowych i mobilnych (React Native, Expo, TanStack Query).
            </Paragraph>
            <Paragraph style={styles.paragraph}>
              System integruje natywne sensory urz¹dzenia, takie jak modu³ GPS (Reverse Geocoding), matrycê aparatu oraz mikrofon, pozwalaj¹c na tworzenie kompleksowej dokumentacji zg³oszeñ.
            </Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.cardTitle}>Informacje akademickie</Title>
            <Paragraph style={styles.infoLine}>
              <Text style={styles.bold}>Autorzy:</Text> £ukasz D¹bek, Daniel Chatys
            </Paragraph>
            <Paragraph style={styles.infoLine}>
              <Text style={styles.bold}>Uczelnia:</Text> Politechnika Œwiêtokrzyska
            </Paragraph>
            <Paragraph style={styles.infoLine}>
              <Text style={styles.bold}>Kierunek:</Text> Informatyka
            </Paragraph>
          </Card.Content>
        </Card>

        <Text style={styles.footer}>© 2026 Wszelkie prawa zastrze¿one</Text>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
    marginBottom: 30,
  },
  icon: {
    backgroundColor: '#6200ee',
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
  },
  version: {
    fontSize: 14,
    color: '#666',
  },
  card: {
    marginBottom: 20,
    elevation: 3,
    backgroundColor: 'white',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6200ee',
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
    color: '#444',
  },
  infoLine: {
    fontSize: 15,
    marginBottom: 5,
    color: '#333',
  },
  bold: {
    fontWeight: 'bold',
  },
  footer: {
    textAlign: 'center',
    marginTop: 20,
    color: 'gray',
    fontSize: 12,
  }
});