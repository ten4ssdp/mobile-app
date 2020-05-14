import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

export default function Input() {
  const [state, setstate] = useState('');
  return <TextInput style={styles.input} />;
}

const styles = StyleSheet.create({
  input: {
    height: 60,
    backgroundColor: 'white'
  }
});
