import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';

import DetailOngletVisit from '../DetailOngletVisit';
import SwitchScreen from '../SwitchScreen';

const { width, height } = Dimensions.get('window');

export default function Onglet({ title, y, isVisitPage, coworker }) {
  const ongletHeight = y.interpolate({
    inputRange: [0, height / 6],
    outputRange: [height / 4, height / 6],
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

  const opacity = new Animated.Value(1);

  // TODO: refecto onglet height

  return (
    <Animated.View
      style={{ ...styles.ongletContainer, height: isVisitPage ? ongletHeight : height / 6 }}
    >
      <Animated.Text
        style={{
          ...styles.title,
          transform: [{ translateY: translateTextY }],
          opacity: 1
        }}
      >
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
      {isVisitPage && <DetailOngletVisit y={y} coworker={coworker} />}
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
