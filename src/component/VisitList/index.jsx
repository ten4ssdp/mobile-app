import useHttpClient from '@loriick/use-http-client';
import React, { useEffect, useState, useContext } from 'react';
import { AsyncStorage, ActivityIndicator, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { UserStore } from '../../context/store/user';
import colors from '../../utils/colors';
import Bold from '../Font/Bold';
import VisitCard from '../VisitCard';

export default function VisitList({ y, navigation }) {
  const [visits, setVisits] = useState([]);
  const [token, setToken] = useState('');
  const { userState, dispatch } = useContext(UserStore);

  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem('token');
      setToken(token);
      await executeRequest();
    }
    getToken();
  }, []);

  const { data, status, error, executeRequest } = useHttpClient(
    'http://15.188.3.249:5000/api/visits/user/25/06-08-2020',
    {
      method: 'GET',
      onRender: false,
      options: {
        headers: {
          authorization: `bearer ${token}`
        }
      }
    }
  );

  if (status === 'pending') {
    return (
      <View style={{ flex: 1, paddingTop: 200 }}>
        <ActivityIndicator size="large" color={colors['midnight-blue']} />
      </View>
    );
  }

  if (status === 'rejected') {
    return <Bold>Error...</Bold>;
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
      {data.visits.map((visit) => {
        return <VisitCard hotel={visit.hotel} key={visit.id} navigation={navigation} />;
      })}
    </Animated.ScrollView>
  );
}
