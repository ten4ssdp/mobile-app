import React, { useContext } from 'react';
import { View } from 'react-native';
import { Value } from 'react-native-reanimated';

import Calendar from '../../component/Calendar';
import Onglet from '../../component/Onglet';
import VisitList from '../../component/VisitList';
import { MainStore } from '../../context/store/main';

export default function Home({ navigation }) {
  const { state } = useContext(MainStore);
  const y = new Value(0);
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Onglet
        y={y}
        isVisitPage={!state.hasToRenderCalendar}
        title={state.hasToRenderCalendar ? 'Mon calendrier' : 'Mes visites'}
      />
      <View style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
        {state.hasToRenderCalendar ? (
          <Calendar y={y} />
        ) : (
          <VisitList navigation={navigation} y={y} />
        )}
      </View>
    </View>
  );
}
