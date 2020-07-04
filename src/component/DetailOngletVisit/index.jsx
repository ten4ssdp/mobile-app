import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';

import { MainStore } from '../../context/store/main';
import colors from '../../utils/colors';
import Bold from '../Font/Bold';
import Light from '../Font/Light';

const { height } = Dimensions.get('screen');

export default function DetailOngletVisit({ y, coworker }) {
  const [visitLength, setVisitLength] = useState(0);
  const { state } = useContext(MainStore);

  useEffect(() => {
    if (state.currentDayVisits && state.currentDayVisits.length > visitLength) {
      setVisitLength(state.currentDayVisits.length);
    }
  }, [state.currentDayVisits]);

  const containerHeight = y.interpolate({
    inputRange: [0, 70],
    outputRange: [50, 0],
    extrapolate: 'clamp'
  });

  console.log('detail', coworker);
  return (
    <View style={styles.container}>
      <Animated.View style={{ height: containerHeight }}>
        {coworker &&
          coworker.map((co) => (
            <View key={co.id} style={styles.textContainer}>
              <Ionicons
                size={25}
                name="md-people"
                color={colors['stroke-default-planning']}
                style={{ marginRight: 10, marginLeft: 20 }}
              />
              <Light style={styles.text}>
                {co.lastname} {co.name}
              </Light>
            </View>
          ))}
      </Animated.View>
      {!!state.currentDayVisits && (
        <View style={styles.visitProgress}>
          <Bold
            style={styles.visitProgressText}
          >{`${state.currentDayVisits.length}/${visitLength}`}</Bold>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: height / 12
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: 14,
    color: colors['midnight-blue']
  },
  visitProgress: {
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: 18,
    height: 25
  },
  visitProgressText: {
    fontSize: 20
  }
});
