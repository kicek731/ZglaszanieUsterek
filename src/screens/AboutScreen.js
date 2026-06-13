import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Title, Avatar, Card } from 'react-native-paper';

export default function ProfileScreen({ navigation }) {

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  };

  return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Avatar.Text size={80} label="�" style={styles.avatar} />
          <Title style={styles.name}>�ukasz</Title>
          <Text style={styles.role}>Konto Administratora</Text>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.label}>Adres e-mail:</Text>
            <Text style={styles.value}>lukasz@example.com</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.label}>Uprawnienia:</Text>
            <Text style={styles.value}>Zarz�dzanie usterkami (Pe�en dost�p)</Text>
          </Card.Content>
        </Card>

        {/* NOWY PRZYCISK: Przej�cie do ekranu O aplikacji */}
        <Button
            mode="outlined"
            icon="information"
            style={styles.aboutButton}
            onPress={() => navigation.navigate('About')}
        >
          O aplikacji / Informacje
        </Button>

        <Button
            mode="contained"
            icon="logout"
            buttonColor="#df4759"
            style={styles.logoutButton}
            onPress={handleLogout}
        >
          Wyloguj si�
        </Button>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    alignItems: 'center',
    marginVertical: 30,
  },
  avatar: {
    backgroundColor: '#6200ee',
    marginBottom: 10,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 16,
    color: '#666',
  },
  card: {
    marginBottom: 15,
    elevation: 2,
    backgroundColor: 'white',
  },
  label: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  aboutButton: {
    marginTop: 20,
    borderRadius: 8,
  },
  logoutButton: {
    marginTop: 'auto',
    marginBottom: 20,
    paddingVertical: 5,
  }
});