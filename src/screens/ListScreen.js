import React, { useState } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, ScrollView } from 'react-native';
import { Button, Card, Text, Title, Paragraph } from 'react-native-paper';
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

  const [activeTab, setActiveTab] = useState('Nowe');

  const filteredIncidents = incidents
      ? incidents.filter(item => item.status === activeTab)
      : [];

  return (
      <View style={styles.container}>
        <View style={styles.filterContainer}>
          <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterScroll}
          >
            <Button
                mode={activeTab === 'Nowe' ? 'contained' : 'outlined'}
                onPress={() => setActiveTab('Nowe')}
                style={styles.filterButton}
            >
              Nowe
            </Button>
            <Button
                mode={activeTab === 'W trakcie' ? 'contained' : 'outlined'}
                onPress={() => setActiveTab('W trakcie')}
                style={styles.filterButton}
            >
              W trakcie
            </Button>
            <Button
                mode={activeTab === 'Naprawione' ? 'contained' : 'outlined'}
                onPress={() => setActiveTab('Naprawione')}
                style={styles.filterButton}
            >
              Naprawione
            </Button>
          </ScrollView>
        </View>

        {isLoading && <ActivityIndicator size="large" color="#6200ee" style={styles.loader} />}
        {isError && <Text style={styles.errorText}>Błąd połączenia z serwerem API.</Text>}

        {incidents && !isLoading && !isError && (
            <FlatList
                data={filteredIncidents}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                  <Text style={styles.emptyText}>Brak zgłoszeń w tej kategorii.</Text>
                }
                renderItem={({ item }) => (
                    <Card style={styles.card}>
                      <Card.Content>
                        <Title style={styles.cardTitle}>{item.title}</Title>
                        {}
                        <Paragraph numberOfLines={1} style={styles.cardDescription}>
                          {item.description || 'Brak opisu'}
                        </Paragraph>
                        <Button
                            mode="contained"
                            style={styles.button}
                            onPress={() => navigation.navigate('Details', { incident: item })}
                        >
                          Szczegóły
                        </Button>
                      </Card.Content>
                    </Card>
                )}
            />
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  filterContainer: {
    backgroundColor: 'white',
    paddingVertical: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    marginBottom: 5,
  },
  filterScroll: {
    paddingHorizontal: 10,
    gap: 10,
  },
  filterButton: {
    minWidth: 100,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 16,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: 'white',
    marginBottom: 12,
    elevation: 2,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  cardDescription: {
    color: '#000000',
  },
  button: {
    marginTop: 10,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
    color: 'gray',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});