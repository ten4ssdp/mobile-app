import React from 'react';
import { View } from 'react-native';

import BackgroundImage from '../../component/BackgroundImage';
import colors from '../../utils/colors';

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
