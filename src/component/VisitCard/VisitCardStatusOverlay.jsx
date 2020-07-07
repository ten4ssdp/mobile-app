import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import colors from '../../utils/colors';

const { width } = Dimensions.get('window');

const generateStatus = (status) => {
  switch (status) {
    case 'canceled':
      return {
        text: 'Visite annulée, elle sera reprogrammée.',
        icon: 'ios-close-circle-outline',
        color: colors['urgence-color-planning']
      };
    case 'validated':
      return {
        text: 'Visite terminée',
        icon: 'ios-checkmark-circle-outline',
        color: colors['green-validate-finish']
      };
  }
};

export default function VisitCardStatusOverlay({ status }) {
  const content = generateStatus(status);

  return (
    <View style={{ ...styles.overlay, borderColor: content.color }}>
      <View style={styles.status}>
        <Ionicons name={content.icon} size={46} color={content.color} />
        <Text style={{ ...styles.statusText, color: content.color }}>{content.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    zIndex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: colors['transparent-white'],
    borderWidth: 2,
    borderRadius: 20,
    borderColor: colors['green-validate-finish']
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginLeft: 40
  },
  statusText: {
    fontSize: 23,
    marginLeft: 7
  }
});

VisitCardStatusOverlay.propTypes = {
  status: PropTypes.oneOf(['canceled', 'validated']).isRequired
};
