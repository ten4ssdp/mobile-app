import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import colors from '../../utils/colors';
import Bold from '../Font/Bold';

export default function VisitCardBtnGoTo() {
  return (
    <View style={styles.goToButtonContainer}>
      <TouchableOpacity onPress={() => console.log("j'y vais")}>
        <Bold style={{ color: colors['active-white'] }}>S'y rendre</Bold>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  goToButtonContainer: {
    marginLeft: 12,
    width: 90,
    height: 30,
    borderRadius: 35,
    backgroundColor: colors['midnight-blue'],
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5
  }
});
