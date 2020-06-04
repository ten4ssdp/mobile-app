import PropTypes from 'prop-types';
import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Light({ children, style }) {
  return <Text style={{ ...styles.light, ...style }}>{children}</Text>;
}

const styles = StyleSheet.create({
  light: {
    fontFamily: 'nexaLight'
  }
});

Light.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object
};
