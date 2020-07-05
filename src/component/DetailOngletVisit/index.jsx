import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
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
    inputRange: [0, 50],
    outputRange: [35, 0],
    extrapolate: 'clamp'
  });

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
      <View style={styles.visitProgress}>
        {!!state.urgences && (
          <View>
            <Bold style={styles.visitProgressText}>Urgences : {state.urgences.length} - </Bold>
          </View>
        )}
        {!!state.currentDayVisits && (
          <View>
            <Bold style={styles.visitProgressText}>
              Visite restantes: {`${state.currentDayVisits.length}`}
            </Bold>
          </View>
        )}
      </View>
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
    justifyContent: 'flex-end',
    paddingRight: 18,
    height: 20,
    flexDirection: 'row'
  },
  visitProgressText: {
    fontSize: 20
  }
});

DetailOngletVisit.propTypes = {
  y: PropTypes.object,
  coworker: PropTypes.array
};
