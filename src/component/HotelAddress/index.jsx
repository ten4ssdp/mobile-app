import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import Bold from '../Font/Bold';

export default function HotelAddress({ location, style }) {
  return (
    <View style={styles.addressContainer}>
      <Bold style={{ marginBottom: 3, ...style }}>{location.address}</Bold>
      <Bold style={{ ...style }}>
        {location.zipCode} {location.city}
      </Bold>
    </View>
  );
}

const styles = StyleSheet.create({
  addressContainer: {
    paddingHorizontal: 12,
    marginVertical: 15
  }
});

HotelAddress.propTypes = {
  location: PropTypes.shape({
    address: PropTypes.string,
    zipCode: PropTypes.number,
    city: PropTypes.string
  }),
  style: PropTypes.object
};
