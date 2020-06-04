import deburr from 'lodash.deburr';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import colors from '../../utils/colors';
import VisitCardAddress from './VisitCardAddress';
import VisitCardBtnGoTo from './VisitCardBtnGoTo';
import VisitCardButtonGroup from './VisitCardButtonGroup';
import VisitCardImage from './VisitCardImage';

const { width } = Dimensions.get('window');

export default function VisitCard({ hotel }) {
  const [latLong, setLatLong] = useState({ lat: null, long: null });
  const location = {
    address: hotel.address,
    city: hotel.city,
    zipCode: hotel.zipCode
  };
  const address = Object.values(location).reduce((acc, cur) => {
    return `${acc} ${cur}`;
  }, '');

  useEffect(() => {
    const getLatLong = async () => {
      const res = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${deburr(address)}&type=street`
      );
      const decoded = await res.json();
      const [long, lat] = await decoded.features[0].geometry.coordinates;
      setLatLong({ lat, long });
    };
    getLatLong();
  }, []);

  return (
    <View style={styles.card}>
      <VisitCardImage name={hotel.name} />
      <VisitCardAddress location={location} />
      <VisitCardBtnGoTo latLong={latLong} name={hotel.name} />
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
