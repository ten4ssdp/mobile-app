import PropTypes from 'prop-types';
import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Light({ children }) {
  return <Text style={style.bold}>{children}</Text>;
}

const style = StyleSheet.create({
  bold: {
    fontFamily: 'nexaLight'
  }
});

Light.propTypes = {
  children: PropTypes.node
};
