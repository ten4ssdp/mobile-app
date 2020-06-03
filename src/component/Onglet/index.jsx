import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import Bold from '../Font/Bold';
import SwitchScreen from '../SwitchScreen';

const { width } = Dimensions.get('window');

export default function Onglet({ title }) {
  return (
    <View style={styles.ongletContainer}>
      <Bold style={styles.title}>{title}</Bold>
      <View style={styles.switchContainer}>
        <SwitchScreen />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ongletContainer: {
    height: 180,
    width,
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  switchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    paddingLeft: 16,
    paddingTop: 20
  }
});
