import PropTypes from 'prop-types';
import React from 'react';
import { View, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import colors from '../../utils/colors';
import Bold from '../Font/Bold';
import Light from '../Font/Light';

const { height } = Dimensions.get('screen');

export default function CalendarCard({ type, hotelName, hour, isUrgence, navigation, hotel }) {
  function setBgColor(type) {
    switch (type) {
      case 1:
        return colors['green-validate-finish'];
      case 'urgence':
        return colors['urgence-color-planning'];
      case -1:
        return colors['midnight-light-blue'];
      default:
        return colors['midnight-blue'];
    }
  }
  return (
    <TouchableWithoutFeedback
      style={{
        ...styles.card,
        backgroundColor: setBgColor(type)
      }}
      onPress={() => {
        navigation.navigate('Details', {
          hotel: hotel.hotel,
          status: type,
          start: hotel.start,
          visitId: hotel.id
        });
      }}
    >
      <View
        style={{
          flex: 1
        }}
      >
        <ImageBackground style={styles.bgImg} source={require('../../../assets/images/grid.png')}>
          <View style={styles.textContainer}>
            <Light style={{ ...styles.text, marginBottom: 5 }}>{hour}</Light>
            <Bold style={styles.text}>{hotelName}</Bold>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
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
  type: 0
};

CalendarCard.propTypes = {
  type: PropTypes.oneOf([1, 0, -1]),
  hotelName: PropTypes.string.isRequired,
  hour: PropTypes.string.isRequired
};
