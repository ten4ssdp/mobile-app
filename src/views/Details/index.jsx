import React from 'react';
import { View } from 'react-native';

import BackgroundImage from '../../component/BackgroundImage';

export default function Details({ navigation, route }) {
  const { hotel } = route.params;
  return (
    <View>
      <BackgroundImage
        name={hotel.name}
        style={{ height: 300, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        resizeMode="cover"
      />
    </View>
  );
}
