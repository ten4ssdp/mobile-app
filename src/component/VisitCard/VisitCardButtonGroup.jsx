import React, { useEffect } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';

import useValidateOrCancelVisit from '../../hooks/useValidateOrCancelVisit';
import colors from '../../utils/colors';

export default function VisitCardButtonGroup({
  navigation,
  hotel,
  latLong,
  status,
  start,
  visitId
}) {
  const { handleSubmit, res } = useValidateOrCancelVisit({ isValidation: true });

  useEffect(() => {
    if (res === null) {
      return undefined;
    }

    if (res.status === 1) {
      Alert.alert('Visite finalisée');
    }
  }, [res]);

  console.log('[RESPONSE]', res);
  return (
    <View style={styles.buttonContainer}>
      <View
        style={{
          ...styles.button,
          backgroundColor: colors['stroke-default-planning']
        }}
      >
        <Button
          title="Visite Finalisée"
          onPress={() => handleSubmit({ id: visitId, body: { description: '' } })}
          color={colors['active-white']}
        />
      </View>
      <View style={{ ...styles.button, backgroundColor: colors['midnight-light-blue'] }}>
        <Button
          title="Détails"
          color={colors['active-white']}
          onPress={() => {
            navigation.navigate('Details', { hotel, latLong, status, start, visitId });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: 45
  },
  button: {
    width: '50%'
  }
});
