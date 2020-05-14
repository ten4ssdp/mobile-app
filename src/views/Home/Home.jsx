import React from 'react';
import { Text, View } from 'react-native';

import Calendar from '../../component/Calendar';

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 100 }}>
        <Text>SamuSociale</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Calendar />
      </View>
    </View>
  );
}
