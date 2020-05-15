import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { TextInput, StyleSheet, Dimensions, View, TouchableWithoutFeedback } from 'react-native';

import colors from '../../utils/colors';

const { width } = Dimensions.get('window');

export default function Input(props) {
  const { type, placeholder, style, ionicons, iconFunc, iconColor } = props;
  return (
    <View style={styles.container}>
      <TextInput
        {...props}
        placeholder={placeholder}
        keyboardType={type !== 'emailAddress' ? 'default' : 'email-address'}
        style={{ ...styles.input, width: ionicons ? '80%' : '100%', ...style }}
        textContentType={type}
        autoCapitalize="none"
      />
      {ionicons && (
        <View style={styles.icon}>
          <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => iconFunc()}>
            <Ionicons name={ionicons} size={32} color={iconColor} />
          </TouchableWithoutFeedback>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors['active-white'],
    width: width - 50,
    height: 60,
    borderRadius: 6,
    overflow: 'hidden'
  },
  input: {
    height: '100%',
    backgroundColor: colors['active-white'],
    paddingLeft: 16,
    color: colors['calendar-inactive-black'],
    fontSize: 15,
    fontFamily: 'nexaBold'
  },
  icon: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});

Input.propTypes = {
  type: PropTypes.string,
  style: PropTypes.object,
  placeholder: PropTypes.string,
  ionicons: PropTypes.string,
  iconFunc: PropTypes.func,
  iconColor: PropTypes.string
};
