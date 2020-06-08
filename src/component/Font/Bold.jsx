import PropTypes from 'prop-types';
import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Bold({ children, style, func }) {
  return (
    <Text style={{ ...styles.bold, ...style }} onPress={() => func()}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  bold: {
    fontFamily: 'nexaBold'
  }
});

Bold.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  func: PropTypes.func
};
