import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import colors from '../../utils/colors';
import Bold from '../Font/Bold';
import Light from '../Font/Light';

const { width } = Dimensions.get('screen');

// TODO: center button content
export default function CancelVisitButton({ func }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => func()}>
        <View style={styles.btn}>
          <Light style={styles.text}>Annuler la visite</Light>
          <View style={styles.exclamationMark}>
            <Bold style={styles.exclamationMarkText}>!</Bold>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 160,
    height: 30,
    borderColor: '#FF7777',
    borderWidth: 1,
    borderRadius: 35,
    overflow: 'hidden',
    alignSelf: 'flex-end',
    marginRight: width / 15
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    lineHeight: 1
  },
  exclamationMark: {
    backgroundColor: '#FF7777',
    height: '100%',
    width: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 1
  },
  text: {
    fontSize: 14,
    color: '#FF7777',
    marginLeft: 10
  },
  exclamationMarkText: {
    color: colors['active-white'],
    fontSize: 18
  }
});

CancelVisitButton.propTypes = {
  func: PropTypes.func.isRequired
};
