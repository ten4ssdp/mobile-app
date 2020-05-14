import React from 'react';
import { View, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';

const items = {
  '2020-05-14': [
    { name: 'Hotel salako', horaire: '12h-14h' },
    { name: 'Hotel salako', horaire: '12h-14h' },
    { name: 'Hotel salako', horaire: '12h-14h' },
    { name: 'Hotel salako', horaire: '12h-14h' }
  ],
  '2020-05-15': [{ name: 'item 2 - any js object', height: 80 }],
  '2020-05-16': [],
  '2020-05-17': [{ name: 'item 3 - any js object' }, { name: 'any js object' }]
};

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
        return (
          <View
            style={{
              backgroundColor: 'white',
              flex: 1,
              borderRadius: 5,
              padding: 5,
              marginRight: 10,
              marginTop: 17,
              height: 150
            }}
          >
            <Text>{item.name}</Text>
            <Text>{item.horaire}</Text>
          </View>
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
        return <View />;
      }}
      onRefresh={() => console.log('refreshing...')}
    />
  );
}
