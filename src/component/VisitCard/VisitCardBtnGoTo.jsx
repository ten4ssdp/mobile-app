import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import colors from '../../utils/colors';
import goToFunction from '../../utils/goToFunction';
import Bold from '../Font/Bold';

export default function VisitCardBtnGoTo({ latLong, name }) {
  return (
    <View style={styles.goToButtonContainer}>
      <TouchableOpacity
        onPress={() => {
          goToFunction(latLong.lat, latLong.long, name);
        }}
      >
        <Bold style={{ color: colors['active-white'] }}>S'y rendre</Bold>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  goToButtonContainer: {
    marginLeft: 12,
    width: 90,
    height: 30,
    borderRadius: 35,
    backgroundColor: colors['midnight-blue'],
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5
  }
});

VisitCardBtnGoTo.propTypes = {
  latlong: PropTypes.object,
  name: PropTypes.string
};
