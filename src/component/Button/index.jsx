import PropTypes from 'prop-types';
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import colors from '../../utils/colors';
import Bold from '../Font/Bold';

export default function Button({ children, func }) {
  return (
    <TouchableOpacity onPress={func}>
      <View style={styles.button}>
        <Bold style={styles.text}>{children}</Bold>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
    backgroundColor: colors['stroke-default-planning'],
    alignSelf: 'center',
    borderRadius: 6
  },
  text: {
    color: colors['active-white'],
    fontSize: 18
  }
});

Button.propTypes = {
  children: PropTypes.node.isRequired,
  func: PropTypes.func.isRequired
};
