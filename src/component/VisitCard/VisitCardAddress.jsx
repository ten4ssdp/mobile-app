import React from 'react';
import { View, StyleSheet } from 'react-native';

import Bold from '../Font/Bold';

export default function VisitCardAddress() {
  return (
    <View style={styles.addressContainer}>
      <Bold style={{ marginBottom: 3 }}>27 bis rue du progres</Bold>
      <Bold>12345 Montreuil</Bold>
    </View>
  );
}

const styles = StyleSheet.create({
  addressContainer: {
    paddingHorizontal: 12,
    marginVertical: 15
  }
});
