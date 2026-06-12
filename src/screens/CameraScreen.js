import React, { useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { CameraView, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import { Button } from 'react-native-paper';

export default function CameraScreen({ route, navigation }) {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
  const [mode, setMode] = useState('photo');
  const [isRecording, setIsRecording] = useState(false);
  const cameraRef = useRef(null);

  if (!cameraPermission || !microphonePermission) return <View />;

  if (!cameraPermission.granted || !microphonePermission.granted) {
    return (
        <View style={styles.center}>
          <Text style={styles.permissionText}>Potrzebujemy dostępu do aparatu i mikrofonu.</Text>
          <Button mode="contained" onPress={async () => {
            await requestCameraPermission();
            await requestMicrophonePermission();
          }}>
            Przyznaj uprawnienia
          </Button>
        </View>
    );
  }

  const handleAction = async () => {
    if (!cameraRef.current) return;

    // Funkcja odbierająca media przekazana z FormScreen
    const onMediaCaptured = route.params?.onMediaCaptured;

    if (mode === 'photo') {
      const photo = await cameraRef.current.takePictureAsync();
      if (onMediaCaptured) {
        onMediaCaptured({ uri: photo.uri, type: 'photo', id: Date.now().toString() });
      }
      navigation.goBack(); // Zamykamy aparat
    } else {
      if (isRecording) {
        cameraRef.current.stopRecording();
        setIsRecording(false);
      } else {
        setIsRecording(true);
        const video = await cameraRef.current.recordAsync();
        setIsRecording(false);
        if (onMediaCaptured) {
          onMediaCaptured({ uri: video.uri, type: 'video', id: Date.now().toString() });
        }
        navigation.goBack(); // Zamykamy aparat po nagraniu
      }
    }
  };

  return (
      <View style={styles.container}>
        <CameraView style={styles.camera} facing="back" ref={cameraRef} mode={mode}>
          <View style={styles.controlsContainer}>
            <View style={styles.toggleRow}>
              <Button mode={mode === 'photo' ? 'contained' : 'outlined'} onPress={() => !isRecording && setMode('photo')} textColor="white" style={styles.toggleButton}>Foto</Button>
              <Button mode={mode === 'video' ? 'contained' : 'outlined'} onPress={() => !isRecording && setMode('video')} textColor="white" style={styles.toggleButton}>Wideo</Button>
            </View>
            <View style={styles.actionRow}>
              <TouchableOpacity style={[styles.captureButton, mode === 'video' && { borderColor: 'red' }]} onPress={handleAction}>
                <View style={[styles.captureInner, mode === 'video' && { backgroundColor: 'red' }, isRecording && { borderRadius: 5, width: 30, height: 30 }]} />
              </TouchableOpacity>
            </View>
          </View>
        </CameraView>
      </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  permissionText: { textAlign: 'center', marginBottom: 20, fontSize: 16 },
  camera: { flex: 1 },
  controlsContainer: { flex: 1, backgroundColor: 'transparent', justifyContent: 'space-between', paddingBottom: 40, paddingTop: 40 },
  toggleRow: { flexDirection: 'row', justifyContent: 'center', gap: 15 },
  toggleButton: { backgroundColor: 'rgba(0,0,0,0.5)', borderColor: 'white' },
  actionRow: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  captureButton: { width: 70, height: 70, borderRadius: 35, borderWidth: 4, borderColor: 'white', backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' },
  captureInner: { width: 54, height: 54, borderRadius: 27, backgroundColor: 'white' }
});