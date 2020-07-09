import PropTypes from 'prop-types';
import React, { useState, useCallback, useContext } from 'react';
import { View, RefreshControl } from 'react-native';
import Animated from 'react-native-reanimated';

import { onRefresh } from '../../context/action/main';
import { MainStore } from '../../context/store/main';
import wait from '../../utils/wait';
import CallButton from '../Button/CallButton';
import Bold from '../Font/Bold';
import VisitCard from '../VisitCard';

export default function VisitList({ y, navigation, visits, urgences }) {
  const [refreshing, setRefreshing] = useState(false);

  const { dispatch } = useContext(MainStore);

  if ((visits?.length <= 0 || !visits) && (!urgences || urgences?.length <= 0)) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Bold style={{ marginBottom: 20, fontSize: 20 }}>Pas de visite aujourd'hui</Bold>
        <CallButton variant="default" />
      </View>
    );
  }

  const refresh = useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => {
      setRefreshing(false);
      onRefresh(dispatch, true);
    });
  }, [refreshing]);

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
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={refresh} />}
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
