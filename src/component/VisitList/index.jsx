import React, { useEffect, useState } from 'react';
import { AsyncStorage, ActivityIndicator, View } from 'react-native';
import Animated from 'react-native-reanimated';

import colors from '../../utils/colors';
import VisitCard from '../VisitCard';

export default function VisitList({ y, navigation }) {
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    const getHotels = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/hotels', {
          headers: {
            'content-type': 'application/json',
            authorization: `bearer ${await AsyncStorage.getItem('token')}`
          }
        });
        const data = await res.json();
        setHotels(data.slice(0, 5));
      } catch (error) {
        console.log(error.message);
      }
    };
    getHotels();
  }, []);

  return hotels.length <= 0 ? (
    <View style={{ flex: 1, paddingTop: 200 }}>
      <ActivityIndicator size="large" color={colors['midnight-blue']} />
    </View>
  ) : (
    <Animated.ScrollView
      scrollEventThrottle={16}
      style={{ flex: 1, paddingTop: 10 }}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y } } }])}
      contentContainerStyle={{
        alignItems: 'center'
      }}
    >
      {hotels.map((hotel) => {
        return <VisitCard hotel={hotel} key={hotel.id} navigation={navigation} />;
      })}
    </Animated.ScrollView>
  );
}
