import React, { useEffect, useState } from 'react';
import { AsyncStorage } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import VisitCard from '../VisitCard';

export default function VisitList({ y }) {
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    const getHotels = async () => {
      const res = await fetch('http://15.188.3.249:5000/api/hotels', {
        headers: {
          'content-type': 'application/json',
          authorization: `bearer ${await AsyncStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      setHotels(data.slice(0, 5));
    };
    getHotels();
  }, []);

  return (
    <Animated.ScrollView
      scrollEventThrottle={16}
      style={{ flex: 1, backgroundColor: '#E5E5E5', paddingTop: 10 }}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y } } }])}
      contentContainerStyle={{
        alignItems: 'center'
      }}
    >
      {hotels.map((hotel) => {
        return <VisitCard hotel={hotel} key={hotel.id} />;
      })}
    </Animated.ScrollView>
  );
}
