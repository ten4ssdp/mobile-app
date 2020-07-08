import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useContext } from 'react';
import { View } from 'react-native';

import { onShowBanner } from '../../context/action/main';
import { MainStore } from '../../context/store/main';
import Light from '../Font/Light';

export default function Banner() {
  const { state, dispatch } = useContext(MainStore);

  useEffect(() => {
    function setToFalse() {
      setTimeout(onShowBanner(dispatch, false), 700);
    }
    if (state.showBanner) {
      setToFalse();
    }
  }, [state.showBanner]);

  return (
    <View
      style={{
        height: 60,
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Ionicons name="md-warning" size={30} color="#FF7777" style={{ marginRight: 20 }} />
      <Light style={{ fontSize: 18 }}>Vous avez une urgence !</Light>
    </View>
  );
}
