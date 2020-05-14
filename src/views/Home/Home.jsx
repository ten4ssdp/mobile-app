import React from 'react';
import { Text, View } from 'react-native';
import Bold from '../../component/Font/Bold';
import Calendar from '../../component/Calendar';

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: 100 }}>
        <Text></Text>
         <Bold>SamuSociale</Bold>
      </View>
      <View style={{ flex: 1 }}>
        <Calendar />
      </View>
    </View>
  );
}
