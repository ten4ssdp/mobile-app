import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import colors from '../../utils/colors';
import createAddress from '../../utils/createAddressFromObj';
import useLatLong from '../../utils/latLong';
import BackgroundImage from '../BackgroundImage';
import HotelAddress from '../HotelAddress';
import VisitCardBtnGoTo from './VisitCardBtnGoTo';
import VisitCardButtonGroup from './VisitCardButtonGroup';

const { width } = Dimensions.get('window');

export default function VisitCard({ visit, navigation }) {
  const { hotel } = visit;
  const location = {
    address: hotel.address,
    city: hotel.city,
    zipCode: hotel.zipCode
  };
  const address = createAddress(location);

  const { latLong } = useLatLong(address);

  return (
    <View style={styles.card}>
      <BackgroundImage name={hotel.name} />
      <HotelAddress location={location} />
      <VisitCardBtnGoTo latLong={latLong} name={hotel.name} />
      <VisitCardButtonGroup
        latLong={latLong}
        hotel={hotel}
        status={visit.status}
        start={visit.start}
        navigation={navigation}
      />
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
  visit: PropTypes.object.isRequired,
  isEmergency: PropTypes.bool,
  navigation: PropTypes.object
};
