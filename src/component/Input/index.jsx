import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function Input() {
  return <TextInput style={styles.input} />;
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    backgroundColor: 'white'
  }
});
