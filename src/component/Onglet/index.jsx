import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';

import SwitchScreen from '../SwitchScreen';

const { width } = Dimensions.get('window');

export default function Onglet({ title, y }) {
  const ongletHeight = y.interpolate({
    inputRange: [0, 180 - 80],
    outputRange: [180, 100],
    extrapolate: 'clamp'
  });
  return (
    <Animated.View style={{ ...styles.ongletContainer, height: ongletHeight }}>
      <Animated.Text style={{ ...styles.title }}>{title}</Animated.Text>
      <View style={styles.switchContainer}>
        <SwitchScreen />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  ongletContainer: {
    height: 180,
    width
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
