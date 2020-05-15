import React from 'react';
import { View, Alert } from 'react-native';

import Calendar from '../../component/Calendar';
import Bold from '../../component/Font/Bold';

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 100 }}>
        <Bold>SamuSociale</Bold>
      </View>
      <View style={{ flex: 1 }}>
        <Calendar />
      </View>
    </View>
  );
}
