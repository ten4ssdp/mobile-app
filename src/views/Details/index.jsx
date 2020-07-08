import React, { useContext, useEffect, useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';

import BackgroundImage from '../../component/BackgroundImage';
import Button from '../../component/Button';
import CallButton from '../../component/Button/CallButton';
import CancelVisitButton from '../../component/CancelVisitButton';
import Bold from '../../component/Font/Bold';
import Light from '../../component/Font/Light';
import HotelAddress from '../../component/HotelAddress';
import { MainStore } from '../../context/store/main';
import useLatLong from '../../hooks/useLatLong';
import colors from '../../utils/colors';
import { cancelled, done, toDo } from '../../utils/constant';
import createAddressFromObj from '../../utils/createAddressFromObj';
import { getDistanceFromLatLonInKm } from '../../utils/distance';
import formatDate from '../../utils/formatDate';
import goToFunction from '../../utils/goToFunction';
import { phoneCall } from '../../utils/phoneCall';

const { height, width } = Dimensions.get('screen');

export default function Details({ route }) {
  const [d, setD] = useState(0);
  const { hotel, status, start, visitId, isEmergency, emergencyText } = route.params;

  const location = {
    address: hotel.address,
    city: hotel.city,
    zipCode: hotel.zipCode
  };

  const address = createAddressFromObj(location);
  const { latLong } = useLatLong(address);

  const { state } = useContext(MainStore);

  useEffect(() => {
    const distance = getDistanceFromLatLonInKm(
      {
        latitude: state?.userLocation?.coords?.latitude,
        longitude: state?.userLocation?.coords?.longitude
      },
      { latitude: latLong?.lat, longitude: latLong?.long }
    );

    setD((distance / 1000).toFixed(1));
  }, []);

  const isValidated = status === 1;
  const isCanceled = status === -1;

  // n'afficher les boutons que si c'est pas validé ou annulé
  const displayButtonGroup = isValidated === false && isCanceled === false;

  const haveVisit = status || start;

  function returnStatus(status) {
    let newStatus;
    switch (status) {
      case -1:
        newStatus = cancelled;
        break;
      case 1:
        newStatus = done;
        break;
      default:
        newStatus = toDo;
    }
    return newStatus;
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={{ height: height / 3, width }}>
        <ScrollView horizontal snapToInterval={width} decelerationRate="fast">
          <BackgroundImage
            name={hotel.name}
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', height: '100%', width }}
            resizeMode="cover"
            isEmergency={isEmergency}
          />
          {latLong.lat && latLong.long && (
            <View style={{ height: '100%', width }}>
              <MapView
                style={{ flex: 1 }}
                region={{
                  latitude: latLong.lat,
                  longitude: latLong.long,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.02
                }}
                scrollEnabled={false}
              >
                <Marker coordinate={{ latitude: latLong.lat, longitude: latLong.long }} />
              </MapView>
              {d > 0 && (
                <View style={styles.hotelNameContainer}>
                  <Bold style={styles.hotelName}>Cette hotel est à environ {d}KM de vous</Bold>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>

      <HotelAddress location={location} style={{ fontSize: 22, color: colors['midnight-blue'] }} />
      <View style={{ paddingHorizontal: 16 }}>
        <Bold style={styles.text}>
          Propriétaire :{' '}
          <Bold style={{ color: colors['stroke-default-planning'] }}>MR DUPOND JACQUES</Bold>
        </Bold>
        <Bold style={styles.text}>
          Numéro de téléphone :{' '}
          <Bold
            func={() => phoneCall(+33122334455)}
            style={{ color: colors['stroke-default-planning'] }}
          >
            01 22 33 44 55
          </Bold>
        </Bold>
      </View>
      {isEmergency ? (
        <View style={{ paddingHorizontal: 16 }}>
          <Bold style={styles.text}>
            Description : <Light style={{ color: colors['midnight-blue'] }}>{emergencyText}</Light>
          </Bold>
        </View>
      ) : (
        <>
          <View style={{ paddingHorizontal: 16, marginBottom: 50 }}>
            {hotel?.visits?.length > 0 && (
              <>
                <Bold style={styles.text}>
                  Dernière visite réalisée le :{' '}
                  <Bold style={{ color: colors['stroke-default-planning'] }}>
                    {formatDate(hotel.visits[0].date)}
                  </Bold>
                </Bold>
                <Bold style={styles.text}>
                  Dernière note de l'hotel :{' '}
                  <Bold style={{ color: colors['stroke-default-planning'] }}>
                    {hotel.visits[0].rate}/60
                  </Bold>
                </Bold>
              </>
            )}

            <Bold style={styles.text}>
              Nombre de chambre à visiter :{' '}
              <Bold style={{ color: colors['stroke-default-planning'] }}>{hotel.roomCount}</Bold>
            </Bold>

            {start && (
              <Bold style={styles.text}>
                Date de Visite :{' '}
                <Bold style={{ color: colors['stroke-default-planning'] }}>
                  {formatDate(start)}
                </Bold>
              </Bold>
            )}
            {status.toString() && (
              <Bold style={styles.text}>
                Status de la visite :{' '}
                <Bold style={{ color: colors['stroke-default-planning'] }}>
                  {returnStatus(status)}
                </Bold>
              </Bold>
            )}
          </View>

          {(haveVisit || isEmergency) && displayButtonGroup && (
            <CancelVisitButton hotelInfo={{ hotelName: hotel.name, visitId }} />
          )}
        </>
      )}

      <View
        style={{
          width: '100%',
          alignItems: 'center',
          flex: 1,
          justifyContent: 'flex-end',
          marginBottom: 36
        }}
      >
        <Button
          style={{ marginBottom: 10 }}
          func={() => goToFunction(latLong.lat, latLong.long, hotel.name)}
          variant="default"
        >
          S'y rendre
        </Button>
        {isEmergency && <CallButton variant={null} />}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: colors['midnight-blue'],
    marginBottom: 10
  },
  hotelNameContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: colors['opacity-midnigth-blue'],
    justifyContent: 'center',
    zIndex: 1
  },
  hotelName: {
    color: colors['active-white'],
    paddingLeft: 10
  }
});
