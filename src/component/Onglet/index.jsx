import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';

import DetailOngletVisit from '../DetailOngletVisit';
import SwitchScreen from '../SwitchScreen';

const { width } = Dimensions.get('window');

export default function Onglet({ title, y, isVisitPage }) {
  const ongletHeight = y.interpolate({
    inputRange: [0, 140],
    outputRange: [230, 140],
    extrapolate: 'clamp'
  });

  const translateTextY = y.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
    extrapolate: 'clamp'
  });
  const translateSwitchY = y.interpolate({
    inputRange: [0, 20],
    outputRange: [0, -20],
    extrapolate: 'clamp'
  });

  // TODO: refecto onglet height

  return (
    <Animated.View style={{ ...styles.ongletContainer, height: isVisitPage ? ongletHeight : 160 }}>
      <Animated.Text style={{ ...styles.title, transform: [{ translateY: translateTextY }] }}>
        {title}
      </Animated.Text>
      <Animated.View
        style={{
          ...styles.switchContainer,
          transform: [{ translateY: translateSwitchY }]
        }}
      >
        <SwitchScreen />
      </Animated.View>
      {isVisitPage && <DetailOngletVisit y={y} />}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  ongletContainer: {
    width,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 100
  },
  switchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    paddingLeft: 16,
    paddingTop: 20,
    fontFamily: 'nexaBold'
  }
});
