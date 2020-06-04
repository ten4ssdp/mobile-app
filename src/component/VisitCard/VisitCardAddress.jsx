import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import Bold from '../Font/Bold';

export default function VisitCardAddress({ location }) {
  return (
    <View style={styles.addressContainer}>
      <Bold style={{ marginBottom: 3 }}>{location.address}</Bold>
      <Bold>
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

// TODO: valid proptypes
VisitCardAddress.propTypes = {
  location: PropTypes.shape({
    address: PropTypes.string,
    zipCode: PropTypes.number,
    city: PropTypes.string
  })
};
