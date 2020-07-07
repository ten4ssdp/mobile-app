import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { View, StyleSheet, Button } from 'react-native';

import { onOpenConfirmationModal, setHotelName } from '../../context/action/main';
import { MainStore } from '../../context/store/main';
import colors from '../../utils/colors';

export default function VisitCardButtonGroup({
  navigation,
  hotel,
  latLong,
  status,
  start,
  visitId,
  isEmergency,
  emergencyText
}) {
  const { dispatch } = useContext(MainStore);

  return (
    <View style={styles.buttonContainer}>
      <View
        style={{
          ...styles.button,
          backgroundColor: colors['stroke-default-planning']
        }}
      >
        <Button
          title="Visite Finalisée"
          onPress={() => {
            onOpenConfirmationModal(dispatch, true);
            setHotelName(dispatch, {
              hotelName: hotel.name,
              visitId
            });
          }}
          color={colors['active-white']}
        />
      </View>
      <View style={{ ...styles.button, backgroundColor: colors['midnight-light-blue'] }}>
        <Button
          title="Détails"
          color={colors['active-white']}
          onPress={() => {
            navigation.navigate('Details', {
              hotel,
              latLong,
              status,
              start,
              visitId,
              isEmergency,
              emergencyText
            });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: 45
  },
  button: {
    width: '50%'
  }
});

VisitCardButtonGroup.propTypes = {
  navigation: PropTypes.object,
  hotel: PropTypes.object,
  latLong: PropTypes.object,
  status: PropTypes.number,
  start: PropTypes.string,
  visitId: PropTypes.number,
  isEmergency: PropTypes.bool,
  emergencyText: PropTypes.string
};
