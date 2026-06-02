import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Button } from 'react-native-paper';

export default function CameraScreen({ navigation }) {
  // Hook do zarz¹dzania uprawnieniami aparatu
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [photoUri, setPhotoUri] = useState(null);

  // Zabezpieczenie podczas ³adowania
  if (!permission) return <View />;

  // Jeœli u¿ytkownik nie da³ jeszcze uprawnieñ
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Aplikacja potrzebuje dostêpu do aparatu.</Text>
        <Button mode="contained" onPress={requestPermission}>Udziel zgody</Button>
      </View>
    );
  }

  // Funkcja robi¹ca zdjêcie
  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setPhotoUri(photo.uri);
    }
  };

  return (
    <View style={styles.container}>
      {photoUri ? (
        <View style={styles.center}>
          <Text style={styles.text}>Zdjêcie zrobione pomyœlnie!</Text>
          <Button mode="contained" onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
            U¿yj tego zdjêcia
          </Button>
          <Button mode="outlined" onPress={() => setPhotoUri(null)}>
            Zrób nowe
          </Button>
        </View>
      ) : (
        <CameraView style={styles.camera} facing="back" ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <Button mode="contained" icon="camera" onPress={takePicture}>
              Zrób zdjêcie usterki
            </Button>
            <Button mode="text" textColor="white" onPress={() => navigation.goBack()}>
              Anuluj
            </Button>
          </View>
        </CameraView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  text: { fontSize: 18, marginBottom: 20, textAlign: 'center' },
  camera: { flex: 1, justifyContent: 'flex-end' },
  buttonContainer: { backgroundColor: 'rgba(0,0,0,0.6)', padding: 20, alignItems: 'center' }
});