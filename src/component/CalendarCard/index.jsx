import PropTypes from 'prop-types';
import React from 'react';
import { View, ImageBackground, StyleSheet, Dimensions } from 'react-native';

import colors from '../../utils/colors';
import Bold from '../Font/Bold';
import Light from '../Font/Light';

const { height } = Dimensions.get('screen');

export default function CalendarCard({ type, hotelName, hour }) {
  function setBgColor(type) {
    switch (type) {
      case 'done':
        return colors['green-validate-finish'];
      case 'urgence':
        return colors['urgence-color-planning'];
      case 'cancelled':
        return colors['midnight-light-blue'];
      default:
        return colors['midnight-blue'];
    }
  }
  return (
    <View
      style={{
        ...styles.card,
        backgroundColor: setBgColor(type)
      }}
    >
      <ImageBackground style={styles.bgImg} source={require('../../../assets/images/grid.png')}>
        <View style={styles.textContainer}>
          <Light style={{ ...styles.text, marginBottom: 5 }}>{hour}</Light>
          <Bold style={styles.text}>{hotelName}</Bold>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
    marginTop: 17,
    height: height / 6
  },
  bgImg: { position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 },
  textContainer: { marginLeft: 20, marginTop: 20 },
  text: { color: colors['active-white'], fontSize: 18 }
});

CalendarCard.defaultProps = {
  type: 'todo'
};

CalendarCard.propTypes = {
  type: PropTypes.oneOf(['todo', 'done', 'cancelled', 'urgence']),
  hotelName: PropTypes.string.isRequired,
  hour: PropTypes.string.isRequired
};