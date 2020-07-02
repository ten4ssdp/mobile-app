import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import Bold from '../Font/Bold';

const { width } = Dimensions.get('screen');

// TODO: center button content
export default function CancelVisitButton({ func, style }) {
  return (
    <TouchableWithoutFeedback style={{ ...styles.container, ...style }} onPress={() => func()}>
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
  func: PropTypes.func.isRequired,
  style: PropTypes.object
};
