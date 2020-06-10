import React from 'react';
import { View } from 'react-native';
import { Agenda } from 'react-native-calendars';

import { formatDateForkeyObj } from '../../utils/formatDate';
import CalendarCard from '../CalendarCard';

const items = {};

items[formatDateForkeyObj()] = [
  { name: 'Hotel salako', horaire: '12h-14h', type: 'urgence' },
  { name: 'Hotel salako', horaire: '12h-14h' },
  { name: 'Hotel salako', horaire: '12h-14h', type: 'cancelled' },
  { name: 'Hotel salako', horaire: '12h-14h', type: 'done' }
];

export default function Calendar() {
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
      minDate={Date.now()}
      maxDate={Date.now()}
      pastScrollRange={100}
      futureScrollRange={100}
      renderItem={(item, firstItemInDay) => {
        return <CalendarCard hotelName={item.name} hour={item.horaire} type={item.type} />;
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
        return <View />;
      }}
      onRefresh={() => console.log('refreshing...')}
    />
  );
}
