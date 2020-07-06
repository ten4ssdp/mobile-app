import React, { useEffect, useState } from 'react';
import { View, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

import useLatLong, { RE } from '../../hooks/useLatLong';
import createAddressFromObj from '../../utils/createAddressFromObj';

export default function Map({ navigation, route }) {
  const [newVisits, setNewVisits] = useState([]);
  const { visits } = route.params;

  useEffect(() => {
    async function getNewVisit() {
      const newVisits = visits.map((visit) => {
        const location = {
          address: visit.hotel.address,
          city: visit.hotel.city,
          zipCode: visit.hotel.zipCode
        };
        const address = createAddressFromObj(location).trim();
        const { lat, long } = RE(address);

        return { ...visit, latlong: { lat, long }, address };
      });
      setNewVisits(newVisits);
    }
    getNewVisit();
  });

  console.log('newVisits', newVisits);
  return (
    <View style={{ flex: 1 }}>
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
          coordinate={{ latitude: 48.8807811, longitude: 2.3586992 }}
          title="hotel magenta"
          description="a paris"
        />
        <Marker
          coordinate={{ latitude: 48.8724691, longitude: 2.3555604 }}
          title="Sogesto"
          description="a paris"
        />
        <Marker
          coordinate={{ latitude: 48.8505225, longitude: 2.3820972 }}
          title="Grand Hotel du progres"
          description="a paris"
        />
      </MapView>
      {/* 
      {newVisits.map((visit) => (
        <Marker
          coordinate={{ latitude: visit.latLong.lat, longitude: visit.latLong.long }}
          title={visit.hotel.name}
          description={visit.address}
        />
      ))} */}
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
      >
        <Button
          style={{ flex: 1 }}
          onPress={() => {
            navigation.goBack();
          }}
          title="X"
        />
      </View>
    </View>
  );
}
