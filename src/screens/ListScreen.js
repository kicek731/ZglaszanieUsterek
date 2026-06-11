import React from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Button } from 'react-native-paper';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


const fetchIncidents = async () => {
  const response = await axios.get('http://172.20.10.6:3000/incidents');
  return response.data;
};

export default function ListScreen({ navigation }) {
  const { data: incidents, isLoading, isError } = useQuery({
    queryKey: ['incidents'],
    queryFn: fetchIncidents,
  });

  return (
      <View style={styles.container}>
        <Text style={styles.text}>Ekran Listy Zgłoszeń</Text>

        {isLoading && <ActivityIndicator size="large" color="#6200ee" />}
        {isError && <Text style={{ color: 'red' }}>Błąd połączenia z serwerem API.</Text>}

        {incidents && !isLoading && !isError && (
            <FlatList
                data={incidents}
                keyExtractor={(item) => item.id}
                style={{ width: '100%', paddingHorizontal: 20 }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                      <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>
                      <Text>Status: {item.status}</Text>
                      <Button
                          mode="contained"
                          style={{ marginTop: 10 }}
                          onPress={() => navigation.navigate('Details', { incident: item })}
                      >
                        Szczegóły / Edycja
                      </Button>
                    </View>
                )}
            />
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 20, // Dodany padding dla górnego paska
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  }
});