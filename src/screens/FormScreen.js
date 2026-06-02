import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function FormScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Ekran formularza</Text>
      {/* Tu póŸniej dodamy przyciski do nawigacji, np: */}
      {/* <Button mode="contained" onPress={() => navigation.navigate('Details')}>Szczegó³y</Button> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  }
});