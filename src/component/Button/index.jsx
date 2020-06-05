import PropTypes from 'prop-types';
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import colors from '../../utils/colors';
import Bold from '../Font/Bold';

const { width } = Dimensions.get('window');

export default function Button({ children, func, variant }) {
  const isDefault = variant === 'default';

  return (
    <TouchableOpacity onPress={() => func()}>
      <View
        style={{
          ...styles.button,
          backgroundColor: isDefault ? colors['stroke-default-planning'] : 'none'
        }}
      >
        <Bold
          style={{
            ...styles.text,
            color: isDefault ? colors['active-white'] : colors['stroke-default-planning']
          }}
        >
          {children}
        </Bold>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    width: width - 50,
    borderRadius: 6
  },
  text: {
    fontSize: 18
  }
});

Button.propTypes = {
  children: PropTypes.node.isRequired,
  func: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['default', null])
};
