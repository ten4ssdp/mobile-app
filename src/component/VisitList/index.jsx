import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import Bold from '../Font/Bold';
import VisitCard from '../VisitCard';

export default function VisitList({ y, navigation, visits }) {
  if (visits?.length <= 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Bold>Pas de visite aujourd'hui</Bold>
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
