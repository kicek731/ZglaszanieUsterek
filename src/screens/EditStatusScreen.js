import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export default function EditStatusScreen({ route, navigation }) {
  // Zabezpieczenie przed błędem, gdy ktoś wejdzie bez przekazania danych
  const incident = route.params?.incident || { id: '0', status: 'Brak', title: 'Brak zgłoszenia' };
  const [status, setStatus] = useState(incident.status);
  const queryClient = useQueryClient();


  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      const response = await axios.put(`http://172.20.10.6:3000/incidents/${incident.id}`, updatedData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['incidents']);
      navigation.goBack();
    },
  });

  const handleUpdate = () => {
    mutation.mutate({ ...incident, status });
  };

  return (
      <View style={styles.container}>
        <Text style={styles.text}>Ekran edycji statusu</Text>

        <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>Usterka: {incident.title}</Text>
        <Text style={{ marginBottom: 20 }}>Obecny status: {status}</Text>

        <View style={styles.buttonRow}>
          <Button
              mode={status === 'Nowe' ? 'contained' : 'outlined'}
              onPress={() => setStatus('Nowe')}
          >
            Nowe
          </Button>
          <Button
              mode={status === 'W trakcie' ? 'contained' : 'outlined'}
              onPress={() => setStatus('W trakcie')}
          >
            W trakcie
          </Button>
          <Button
              mode={status === 'Naprawione' ? 'contained' : 'outlined'}
              onPress={() => setStatus('Naprawione')}
          >
            Naprawione
          </Button>
        </View>

        <Button
            mode="contained"
            buttonColor="green"
            onPress={handleUpdate}
            loading={mutation.isPending}
            disabled={mutation.isPending}
            style={{ marginTop: 30 }}
        >
          Zapisz zmiany (PUT)
        </Button>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    justifyContent: 'center',
  }
});