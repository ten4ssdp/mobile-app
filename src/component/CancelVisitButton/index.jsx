import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { onOpenModal, setHotelName } from '../../context/action/main';
import { MainStore } from '../../context/store/main';
import Bold from '../Font/Bold';

const { width } = Dimensions.get('screen');

export default function CancelVisitButton({ hotelInfo, style }) {
  const { dispatch } = useContext(MainStore);

  return (
    <TouchableWithoutFeedback
      style={{ ...styles.container, ...style }}
      onPress={() => {
        onOpenModal(dispatch, true);
        setHotelName(dispatch, { hotelName: hotelInfo.hotelName, visitId: hotelInfo.visitId });
      }}
    >
      <Bold style={styles.text}>Annuler la visite</Bold>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 140,
    height: 30,
    borderColor: '#FF7777',
    borderWidth: 2,
    overflow: 'hidden',
    alignSelf: 'flex-end',
    marginRight: width / 15,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 14,
    color: '#FF7777'
  }
});

CancelVisitButton.propTypes = {
  hotelName: PropTypes.string,
  style: PropTypes.object
};
