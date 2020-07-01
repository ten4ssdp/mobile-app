import React, { useEffect, useState, useContext } from 'react';
import { AsyncStorage, ActivityIndicator, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { getVisitsAction, getCurrentDayVisits } from '../../context/action/main';
import { MainStore } from '../../context/store/main';
import { UserStore } from '../../context/store/user';
import colors from '../../utils/colors';
import { formatDateForMickey, getFirstDay } from '../../utils/formatDate';
import http from '../../utils/http';
import VisitCard from '../VisitCard';

export default function VisitList({ y, navigation }) {
  const [visits, setVisits] = useState(null);
  const [token, setToken] = useState('');
  const { userState } = useContext(UserStore);
  const { state, dispatch: mainDispatch } = useContext(MainStore);

  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem('token');
      setToken(token);
    }
    getToken();
  }, []);

  useEffect(() => {
    const getVisits = async () => {
      try {
        const res = await http.get(
          `visits/user/${userState.user.id}/${formatDateForMickey(getFirstDay(new Date()))}`,
          {
            authorization: `bearer ${token}`
          }
        );
        await getVisitsAction(mainDispatch, res.visits);
      } catch (error) {
        console.error(error.message);
      }
    };
    if (state.visits === null) {
      getVisits();
    }
  }, [token]);

  useEffect(() => {
    function currentDayVisits() {
      const today = new Date();
      const filteredVisits = state.visits?.filter((visit) => {
        return visit.status === 0 && new Date(visit.start).getDate() === today.getDate();
      });
      setVisits(filteredVisits);
      getCurrentDayVisits(mainDispatch, filteredVisits);
    }
    currentDayVisits();
  }, [state.visits]);

  if (visits === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={colors['midnight-blue']} />
      </View>
    );
  }

  return (
    <Animated.ScrollView
      scrollEventThrottle={16}
      style={{ flex: 1, paddingTop: 10 }}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y } } }])}
      contentContainerStyle={{
        alignItems: 'center'
      }}
    >
      {visits?.map((visit) => {
        return <VisitCard visit={visit} key={visit.id} navigation={navigation} />;
      })}
    </Animated.ScrollView>
  );
}
