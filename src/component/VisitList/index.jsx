import React, { useEffect, useState, useContext } from 'react';
import { AsyncStorage, ActivityIndicator } from 'react-native';
import Animated from 'react-native-reanimated';

import { getVisitsAction, getCurrentDayVisits } from '../../context/action/main';
import { MainStore } from '../../context/store/main';
import { UserStore } from '../../context/store/user';
import colors from '../../utils/colors';
import { formatDateForMickey, getFirstDay } from '../../utils/formatDate';
import http from '../../utils/http';
import VisitCard from '../VisitCard';

export default function VisitList({ y, navigation }) {
  const [visits, setVisits] = useState([]);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  const { userState, dispatch } = useContext(UserStore);
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
        console.log({ e: userState.user, token });
        const res = await http.get(
          `visits/user/${userState.user.id}/${formatDateForMickey(getFirstDay(new Date()))}`,
          {
            authorization: `bearer ${token}`
          }
        );

        await getVisitsAction(mainDispatch, res.visits);
      } catch (error) {
        setLoading(false);
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
      const filteredVisits = state.visits.filter((visit) => {
        console.log('today', today);
        console.log('visite', new Date(visit.start).getTime());

        console.log(new Date(visit.start).getDate() === today.getDate());
        return visit.status === 0 && new Date(visit.start).getDate() === today.getDate();
      });

      setVisits(filteredVisits);
      getCurrentDayVisits(dispatch, filteredVisits);
      setLoading(false);
    }
    if (state.visits !== null && visits.length === 0) {
      currentDayVisits();
    }
  }, [state.visit]);

  if (loading) {
    return <ActivityIndicator size="large" color={colors['midBlack']} />;
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
      {visits.map((visit) => {
        return <VisitCard hotel={visit.hotel} key={visit.id} navigation={navigation} />;
      })}
    </Animated.ScrollView>
  );
}
