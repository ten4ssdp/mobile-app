import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import useLatLong from '../../hooks/useLatLong';
import colors from '../../utils/colors';
import createAddress from '../../utils/createAddressFromObj';
import BackgroundImage from '../BackgroundImage';
import CancelVisitButton from '../CancelVisitButton';
import HotelAddress from '../HotelAddress';
import VisitCardBtnGoTo from './VisitCardBtnGoTo';
import VisitCardButtonGroup from './VisitCardButtonGroup';
import VisitCardStatusOverlay from './VisitCardStatusOverlay';

const { width } = Dimensions.get('window');

export default function VisitCard({ visit, navigation, isEmergency, emergencyText }) {
  const { hotel } = visit;
  const location = {
    address: hotel.address,
    city: hotel.city,
    zipCode: hotel.zipCode
  };

  const address = createAddress(location);

  const { latLong } = useLatLong(address);

  const isValidated = visit.status === 1;
  const isCanceled = visit.status === -1;

  // n'afficher les boutons que si c'est pas validé ou annulé
  const displayButtonGroup = isValidated === false && isCanceled === false;

  // double check pour la visite
  const haveVisit = visit.status || visit.start;

  return (
    <View style={{ ...styles.card, height: displayButtonGroup ? 330 : 210 }}>
      {displayButtonGroup === false && (
        <VisitCardStatusOverlay
          status={isCanceled ? 'canceled' : isValidated ? 'validated' : null}
        />
      )}

      <BackgroundImage name={hotel.name} isEmergency={isEmergency} />

      <HotelAddress location={location} />

      {displayButtonGroup && <VisitCardBtnGoTo latLong={latLong} name={hotel.name} />}

      {(haveVisit || !isEmergency) && displayButtonGroup && (
        <CancelVisitButton hotelInfo={{ hotelName: hotel.name, visitId: visit.id }} />
      )}

      {displayButtonGroup && (
        <VisitCardButtonGroup
          latLong={latLong}
          hotel={hotel}
          status={visit.status}
          start={visit.start}
          navigation={navigation}
          visitId={visit.id}
          isEmergency={isEmergency}
          emergencyText={emergencyText}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width / 1.1,
    backgroundColor: colors['active-white'],
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20
  },
  overlay: {
    position: 'absolute',
    height: 330,
    width: width / 1.1,
    backgroundColor: colors['transparent-white']
  }
});

VisitCard.propTypes = {
  visit: PropTypes.object.isRequired,
  isEmergency: PropTypes.bool,
  navigation: PropTypes.object,
  emergencyText: PropTypes.string
};
