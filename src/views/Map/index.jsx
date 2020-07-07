import React from 'react';
import { View, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function Map({ hotel, latLong }) {
  // const { visits } = route.params;

  return (
    <View style={{ height: 150, width: '100%' }}>
      <MapView
        region={{
          latitude: 48.866667,
          longitude: 2.333333,
          latitudeDelta: 0.15,
          longitudeDelta: 0.15
        }}
        style={{ flex: 1 }}
      >
        <Marker
          coordinate={{ latitude: latLong.lat, longitude: latLong.long }}
          title={hotel.name}
          description="visit.address"
          onPress={() => console.log('go')}
        />
      </MapView>

      <View
        style={{
          width: 50,
          height: 50,
          borderRadius: 100,
          position: 'absolute',
          bottom: 100,
          right: 100,
          backgroundColor: 'red'
        }}
      />
    </View>
  );
}
