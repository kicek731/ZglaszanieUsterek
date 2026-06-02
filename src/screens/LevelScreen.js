import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';

export default function LevelScreen() {
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    // Ustawienie czêstotliwoœci odœwie¿ania na 50ms
    Accelerometer.setUpdateInterval(50);
    
    // Nas³uchiwanie zmian z czujnika
    const subscription = Accelerometer.addListener(accelerometerData => {
      setData(accelerometerData);
    });
    
    // Zatrzymanie nas³uchiwania przy wyjœciu z ekranu
    return () => subscription.remove();
  }, []);

  // Prosta logika: jeœli telefon jest p³asko/prosto, x i y s¹ bliskie zera
  const isLevel = Math.abs(data.x) < 0.05 && Math.abs(data.y) < 0.05;

  return (
    <View style={[styles.container, { backgroundColor: isLevel ? '#4caf50' : '#f44336' }]}>
      <Text style={styles.title}>Wirtualna Poziomica</Text>
      <Text style={styles.status}>
        {isLevel ? 'Powierzchnia jest idealnie prosta!' : 'Krzywo...'}
      </Text>
      <View style={styles.dataContainer}>
        <Text style={styles.dataText}>Oœ X: {data.x.toFixed(2)}</Text>
        <Text style={styles.dataText}>Oœ Y: {data.y.toFixed(2)}</Text>
        <Text style={styles.dataText}>Oœ Z: {data.z.toFixed(2)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 20 },
  status: { fontSize: 20, color: 'white', marginBottom: 40 },
  dataContainer: { backgroundColor: 'rgba(255,255,255,0.8)', padding: 20, borderRadius: 10 },
  dataText: { fontSize: 18, marginVertical: 5, color: '#333' }
});