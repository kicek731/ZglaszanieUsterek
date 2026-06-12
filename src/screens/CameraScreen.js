import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button } from 'react-native-paper';

export default function CameraScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);

  // Zanim aplikacja sprawdzi uprawnienia, nic nie pokazujemy
  if (!permission) {
    return <View />;
  }

  // Jeśli użytkownik jeszcze nie dał dostępu (lub odmówił), wyświetlamy prośbę
  if (!permission.granted) {
    return (
        <View style={styles.center}>
          <Text style={{ textAlign: 'center', marginBottom: 20 }}>
            Potrzebujemy dostępu do aparatu, aby zrobić zdjęcie usterki.
          </Text>
          <Button mode="contained" onPress={requestPermission}>
            Przyznaj uprawnienia
          </Button>
        </View>
    );
  }

  // Funkcja robiąca zdjęcie
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      // Wracamy do ekranu Formularza i przekazujemy mu wygenerowany adres zdjęcia (URI)
      navigation.navigate('Form', { photoUri: photo.uri });
    }
  };

  return (
      <View style={styles.container}>
        <CameraView style={styles.camera} facing="back" ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <View style={styles.captureInner} />
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  camera: { flex: 1 },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingBottom: 40, // Przycisk będzie na dole ekranu
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
  }
});