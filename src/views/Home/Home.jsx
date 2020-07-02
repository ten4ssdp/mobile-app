import React, { useContext } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Value } from 'react-native-reanimated';

import Calendar from '../../component/Calendar';
import MyModal from '../../component/Modal';
import Onglet from '../../component/Onglet';
import VisitList from '../../component/VisitList';
import { MainStore } from '../../context/store/main';
import useFetchDataApp from '../../hooks/useFetchDataApp';
import colors from '../../utils/colors';

export default function Home({ navigation }) {
  const { state } = useContext(MainStore);
  const y = new Value(0);

  const { visits, loading } = useFetchDataApp();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors['midnight-blue']} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Onglet
        y={y}
        isVisitPage={!state.hasToRenderCalendar}
        title={state.hasToRenderCalendar ? 'Mon calendrier' : 'Mes visites'}
      />
      <View style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
        {state.hasToRenderCalendar ? (
          <Calendar y={y} navigation={navigation} />
        ) : (
          <VisitList visits={visits} navigation={navigation} y={y} />
        )}
      </View>
      <MyModal />
    </View>
  );
}
