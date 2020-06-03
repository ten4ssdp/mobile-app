import React from 'react';
import Animated from 'react-native-reanimated';

import VisitCard from '../VisitCard';

export default function VisitList({ y }) {
  return (
    <Animated.ScrollView
      scrollEventThrottle={16}
      style={{ flex: 1, backgroundColor: '#E5E5E5', paddingTop: 10 }}
      onScroll={Animated.event([{ nativeEvent: { contentOffset: { y } } }])}
    >
      <VisitCard />
      <VisitCard />
      <VisitCard />
      <VisitCard />
      <VisitCard />
      <VisitCard />
    </Animated.ScrollView>
  );
}
