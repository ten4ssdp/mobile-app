import PropTypes from 'prop-types';
import React from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';

import Bold from '../Font/Bold';
import VisitCard from '../VisitCard';

export default function VisitList({ y, navigation, visits, urgences }) {
  if ((visits?.length <= 0 || !visits) && (!urgences || visits?.length <= 0)) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Bold>Pas de visite aujourd'hui</Bold>
      </View>
    );
  }

  return (
    <Animated.ScrollView
      scrollEventThrottle={1}
      style={{ flex: 1, paddingTop: 10 }}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
        useNativeDriver: true
      })}
      scrollToOverflowEnabled
      scrollEnabled
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

VisitList.propTypes = {
  y: PropTypes.object,
  navigation: PropTypes.object,
  visits: PropTypes.array,
  urgences: PropTypes.array
};
