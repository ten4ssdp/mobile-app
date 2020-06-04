import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import colors from '../../utils/colors';
import VisitCardAddress from './VisitCardAddress';
import VisitCardBtnGoTo from './VisitCardBtnGoTo';
import VisitCardButtonGroup from './VisitCardButtonGroup';
import VisitCardImage from './VisitCardImage';

const { width } = Dimensions.get('window');

export default function VisitCard({ hotel }) {
  const location = {
    address: hotel.address,
    city: hotel.city,
    zipCode: hotel.zipCode
  };
  return (
    <View style={styles.card}>
      <VisitCardImage name={hotel.name} />
      <VisitCardAddress location={location} />
      <VisitCardBtnGoTo />
      <VisitCardButtonGroup />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 300,
    width: width / 1.1,
    backgroundColor: colors['active-white'],
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20
  }
});

VisitCard.propTypes = {
  hotel: PropTypes.object.isRequired,
  isEmergency: PropTypes.bool
};
