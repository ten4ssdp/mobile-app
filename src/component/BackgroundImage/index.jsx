import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

import colors from '../../utils/colors';
import Bold from '../Font/Bold';

export default function BackgroundImage({ isEmergency, name, style, resizeMode }) {
  return (
    <ImageBackground
      style={{ ...styles.imageContainer, ...style }}
      source={require('../../../assets/images/default-visit-hotel.png')}
      resizeMode={resizeMode ? resizeMode : 'contain'}
    >
      {isEmergency && (
        <View style={styles.redOverlay}>
          <Bold style={styles.emergencyText}>Urgence</Bold>
        </View>
      )}
      <View style={styles.hotelNameContainer}>
        <Bold style={styles.hotelName}>{name}</Bold>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 148,
    width: '100%'
  },

  hotelNameContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: colors['opacity-midnigth-blue'],
    justifyContent: 'center',
    zIndex: 1
  },
  hotelName: {
    color: colors['active-white'],
    paddingLeft: 10
  },
  redOverlay: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors['red-opacity'],
    justifyContent: 'center'
  },
  emergencyText: {
    color: colors['active-white'],
    fontSize: 35,
    marginLeft: 25
  }
});

BackgroundImage.propTypes = {
  isEmergency: PropTypes.bool,
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
  resizeMode: PropTypes.string
};
