import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';

import { onSwitchScreen } from '../../context/action/main';
import { MainStore } from '../../context/store/main';
import colors from '../../utils/colors';
import Bold from '../Font/Bold';

const { width } = Dimensions.get('window');

function SwitchItem(props) {
  return (
    <TouchableOpacity
      onPress={() => props.onClick()}
      style={{ ...styles.switchItem, ...props.style }}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Bold style={styles.text}>{props.label}</Bold>
      </View>
    </TouchableOpacity>
  );
}

export default function SwitchScreen() {
  const { state, dispatch } = useContext(MainStore);

  return (
    <View style={styles.switchContainer}>
      <SwitchItem
        label="Visites"
        style={{ backgroundColor: colors['stroke-default-planning'] }}
        onClick={() => onSwitchScreen(dispatch, !state.hasToRenderCalender)}
      />
      <SwitchItem
        label="Calendrier"
        onClick={() => onSwitchScreen(dispatch, !state.hasToRenderCalender)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    width: width / 1.5,
    height: 50,
    backgroundColor: colors['light-grey'],
    borderRadius: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  switchItem: {
    height: '100%',
    width: '50%',
    borderRadius: 20
  },
  text: {
    color: colors['inactive-grey-text'],
    fontSize: 16
  }
});

SwitchItem.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  style: PropTypes.object
};
