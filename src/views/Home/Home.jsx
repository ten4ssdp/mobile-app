import React, { useContext, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Value } from 'react-native-reanimated';

import Calendar from '../../component/Calendar';
import MyModal from '../../component/Modal';
import ModalConfirmation from '../../component/ModalConfirmation';
import Onglet from '../../component/Onglet';
import VisitList from '../../component/VisitList';
import { getUserLocationAction } from '../../context/action/main';
import { MainStore } from '../../context/store/main';
import useFetchDataApp from '../../hooks/useFetchDataApp';
import colors from '../../utils/colors';
import { getUserLocation } from '../../utils/getUserLocation';

export default function Home({ navigation }) {
  const { state, dispatch } = useContext(MainStore);
  const y = new Value(0);

  const { visits, loading, coworker, urgences } = useFetchDataApp();

  useEffect(() => {
    const permissions = async () => {
      const userLocation = await getUserLocation();
      console.log(userLocation);
      getUserLocationAction(dispatch, userLocation);
    };
    permissions();
  }, []);

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
        coworker={coworker}
      />
      <View style={{ flex: 1, backgroundColor: '#E5E5E5' }}>
        {state.hasToRenderCalendar ? (
          <Calendar y={y} navigation={navigation} />
        ) : (
          <VisitList urgences={urgences} visits={visits} navigation={navigation} y={y} />
        )}
      </View>
      <MyModal />
      <ModalConfirmation />
    </View>
  );
}
