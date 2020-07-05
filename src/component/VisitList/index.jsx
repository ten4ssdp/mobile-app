import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import Bold from '../Font/Bold';
import VisitCard from '../VisitCard';

export default function VisitList({ y, navigation, visits, urgences }) {
  if ((visits?.length <= 0 || !visits) && urgences === null) {
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
      {urgences &&
        urgences.map((urgence) => {
          return (
            <VisitCard
              key={urgence.id}
              navigation={navigation}
              visit={urgence}
              isEmergency={urgence.isUrgent}
              emergencyText={urgence.description}
            />
          );
        })}
      {visits?.map((visit) => {
        return <VisitCard visit={visit} key={visit.id} navigation={navigation} />;
      })}
    </Animated.ScrollView>
  );
}
