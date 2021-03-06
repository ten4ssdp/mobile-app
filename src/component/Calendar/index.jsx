import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Agenda } from 'react-native-calendars';

import { MainStore } from '../../context/store/main';
import { formatDateForkeyObj, returnHours } from '../../utils/formatDate';
import CallButton from '../Button/CallButton';
import CalendarCard from '../CalendarCard';
import Bold from '../Font/Bold';

export default function Calendar({ navigation }) {
  const [items, setItems] = useState({});
  const { state } = useContext(MainStore);

  useEffect(() => {
    const getVisitsCalendar = () => {
      if (!state.visits) {
        setItems({});
        return undefined;
      }

      const dates = [
        ...new Map(state.visits.map((item) => [new Date(item.start).getDate(), item])).values()
      ].map((visit) => visit.start);

      const items = dates.reduce((prev, curr) => {
        prev[formatDateForkeyObj(curr)] = state?.visits?.filter(
          (visit) => new Date(curr).getDate() === new Date(visit.start).getDate()
        );
        return prev;
      }, {});

      setItems(items);
    };
    getVisitsCalendar();
  }, [state.visits]);

  return (
    <Agenda
      items={items} // Callback that gets called when items for a certain month should be loaded (month became visible)
      loadItemsForMonth={(month) => {
        console.log('trigger items loading');
      }}
      // Callback that fires when the calendar is opened or closed
      onCalendarToggled={(calendarOpened) => {
        console.log(calendarOpened);
      }}
      onDayChange={(day) => {
        console.log('day changed');
      }}
      renderKnob={() => {
        return <View />;
      }}
      selected={Date.now()}
      pastScrollRange={100}
      futureScrollRange={100}
      renderItem={(item, firstItemInDay) => {
        return (
          <CalendarCard
            hotelName={item.hotel.name}
            hour={returnHours({ start: item.start, end: item.end })}
            type={item.status}
            navigation={navigation}
            hotel={item}
          />
        );
      }}
      style={{ flex: 1 }}
      theme={{
        agendaDayTextColor: 'yellow',
        agendaDayNumColor: 'green',
        agendaTodayColor: 'red',
        agendaKnobColor: 'blue'
      }}
      rowHasChanged={(r1, r2) => {
        return r1.text !== r2.text;
      }}
      renderEmptyData={() => {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Bold style={{ fontSize: 20, marginBottom: 10 }}>Pas de visites programmées.</Bold>
            <Bold style={{ fontSize: 20, marginBottom: 10 }}>Appelez le bureau si besoin</Bold>
            <CallButton variant="default" />
          </View>
        );
      }}
      onRefresh={() => console.log('refreshing...')}
    />
  );
}

Calendar.propTypes = {
  navigation: PropTypes.object
};
