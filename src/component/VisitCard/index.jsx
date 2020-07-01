import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet, Dimensions, Alert } from 'react-native';

import colors from '../../utils/colors';
import createAddress from '../../utils/createAddressFromObj';
import useLatLong from '../../utils/latLong';
import BackgroundImage from '../BackgroundImage';
import CancelVisitButton from '../CancelVisitButton';
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
      <CancelVisitButton
        func={() =>
          Alert.alert(
            'Annuler la visite',
            'Voulez-vous vraiment annuler la visite ?',
            [
              { text: 'Oui', onPress: () => console.log('Visite annulée') },
              {
                text: 'Non',
                onPress: () => console.log('Retour'),
                style: 'cancel'
              }
            ],
            { cancelable: false }
          )
        }
      />
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
    height: 330,
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
