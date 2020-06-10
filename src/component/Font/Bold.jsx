import PropTypes from 'prop-types';
import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Bold({ children, style, func }) {
  return (
    <Text func={func ? () => func() : null} style={{ ...styles.bold, ...style }}>
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
  func: PropTypes.any
};
