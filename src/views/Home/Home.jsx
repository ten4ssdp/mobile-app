import React, { useContext } from 'react';
import { View } from 'react-native';

import Calendar from '../../component/Calendar';
import Onglet from '../../component/Onglet';
import VisitList from '../../component/VisitList';
import { MainStore } from '../../context/store/main';

export default function Home() {
  const { state } = useContext(MainStore);
  console.log(state);
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Onglet title="Mes visites" />
      <View style={{ flex: 1 }}>{state.hasToRenderCalendar ? <Calendar /> : <VisitList />}</View>
    </View>
  );
}
