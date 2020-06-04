import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

import colors from '../../utils/colors';
import Bold from '../Font/Bold';

export default function VisitCardImage() {
  return (
    <ImageBackground
      style={styles.imageContainer}
      source={require('../../../assets/images/default-visit-hotel.png')}
      resizeMode="contain"
    >
      <View style={styles.hotelNameContainer}>
        <Bold style={styles.hotelName}>Hello</Bold>
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
    justifyContent: 'center'
  },
  hotelName: {
    color: colors['active-white'],
    paddingLeft: 10
  }
});
