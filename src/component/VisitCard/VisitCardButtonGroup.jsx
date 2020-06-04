import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

import colors from '../../utils/colors';

export default function VisitCardButtonGroup() {
  return (
    <View style={styles.buttonContainer}>
      <View style={{ ...styles.button, backgroundColor: colors['stroke-default-planning'] }}>
        <Button title="Visite Finalisée" color={colors['active-white']} />
      </View>
      <View style={{ ...styles.button, backgroundColor: colors['midnight-light-blue'] }}>
        <Button title="Détails" color={colors['active-white']} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: 45
  },
  button: {
    width: '50%'
  }
});
