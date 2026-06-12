import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import * as Location from 'expo-location';

// Dodano 'route' do parametrów
export default function LocationScreen({ route, navigation }) {
    const [locationData, setLocationData] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Brak uprawnień do lokalizacji. Odblokuj GPS w ustawieniach.');
                setLoading(false);
                return;
            }

            try {
                let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
                const { latitude, longitude } = location.coords;

                let geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
                let address = "Brak dokładnego adresu";

                if (geocode.length > 0) {
                    const loc = geocode[0];
                    address = `${loc.street || ''} ${loc.streetNumber || ''}, ${loc.city || ''}`.trim();
                }

                setLocationData({ latitude, longitude, address });
            } catch (error) {
                setErrorMsg('Nie udało się pobrać lokalizacji.');
            }
            setLoading(false);
        })();
    }, []);

    const handleConfirm = () => {
        // Odpalamy funkcję przekazaną z formularza i po prostu ZAMYKAMY ten ekran
        if (route.params?.onLocationSelected) {
            route.params.onLocationSelected(locationData);
        }
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <>
                    <ActivityIndicator size="large" color="#6200ee" />
                    <Text style={{ marginTop: 20 }}>Szukanie sygnału GPS...</Text>
                </>
            ) : errorMsg ? (
                <Text style={{ color: 'red', textAlign: 'center' }}>{errorMsg}</Text>
            ) : (
                <Card style={styles.card}>
                    <Card.Content>
                        <Text style={styles.label}>Znaleziony adres:</Text>
                        <Text style={styles.value}>{locationData.address}</Text>

                        <Text style={styles.label}>Współrzędne:</Text>
                        <Text style={styles.value}>{locationData.latitude.toFixed(5)}, {locationData.longitude.toFixed(5)}</Text>

                        <Button mode="contained" style={styles.button} onPress={handleConfirm}>
                            Użyj tej lokalizacji
                        </Button>
                        <Button mode="outlined" style={styles.button} onPress={() => navigation.goBack()}>
                            Anuluj
                        </Button>
                    </Card.Content>
                </Card>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f5f5f5' },
    card: { elevation: 3 },
    label: { fontSize: 14, color: 'gray', marginTop: 10 },
    value: { fontSize: 18, fontWeight: 'bold' },
    button: { marginTop: 15 }
});