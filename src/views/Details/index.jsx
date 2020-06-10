import * as Linking from 'expo-linking';
import React from 'react';
import { View, Dimensions, StyleSheet, Alert } from 'react-native';

import BackgroundImage from '../../component/BackgroundImage';
import Button from '../../component/Button';
import CancelVisitButton from '../../component/CancelVisitButton';
import Bold from '../../component/Font/Bold';
import Light from '../../component/Font/Light';
import HotelAddress from '../../component/HotelAddress';
import colors from '../../utils/colors';
import formatDate from '../../utils/formatDate';
import goToFunction from '../../utils/goToFunction';
const { height } = Dimensions.get('screen');

export default function Details({ navigation, route, isEmergency }) {
  const { hotel, latLong } = route.params;
  const location = {
    address: hotel.address,
    city: hotel.city,
    zipCode: hotel.zipCode
  };

  return (
    <View style={{ flex: 1 }}>
      <BackgroundImage
        name={hotel.name}
        style={{ height: height / 3, backgroundColor: 'rgba(0, 0, 0, 0.3)', marginBottom: 20 }}
        resizeMode="cover"
        isEmergency={isEmergency}
      />
      <HotelAddress location={location} style={{ fontSize: 22, color: colors['midnight-blue'] }} />
      <View style={{ paddingHorizontal: 16 }}>
        <Bold style={styles.text}>
          Propriétaire :{' '}
          <Bold style={{ color: colors['stroke-default-planning'] }}>MR DUPOND JACQUES</Bold>
        </Bold>
        <Bold style={styles.text}>
          Numéro de téléphone :{' '}
          <Bold
            func={() => Linking.openURL(`tel:${+33122334455}`)}
            style={{ color: colors['stroke-default-planning'] }}
          >
            01 22 33 44 55
          </Bold>
        </Bold>
      </View>
      {isEmergency ? (
        <View style={{ paddingHorizontal: 16 }}>
          <Bold style={styles.text}>Description :</Bold>
          <Light style={{ color: colors['midnight-blue'] }}>
            Vous avez été contacté par une urgence. Celle-ci concerne l’hôtel Mercure de Bobigny. Il
            semblerait qu’un incendie ce soit déclaré entre 8h et 9h du matin. Il faut donc, qu’un
            binome aillent directement sur les lieux afin de constater les dégats. Merci d’informer
            vos supérieurs quand vous avez terminé l’inspection.
          </Light>
        </View>
      ) : (
        <>
          <View style={{ paddingHorizontal: 16, marginBottom: 50 }}>
            {hotel.visits.length > 0 && (
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
            <Bold style={styles.text}>
              Secteur:{' '}
              <Bold style={{ color: colors['stroke-default-planning'] }}>{hotel.sector.name}</Bold>
            </Bold>
          </View>
          <CancelVisitButton
            func={() =>
              Alert.alert(
                'Annuler la visite',
                'Voulez-vous vraiment annuler la visite ?',
                [
                  { text: 'Oui', onPress: () => console.log('Visite annulée') },
                  {
                    text: 'Non',
                    onPress: () => console.log('Retour'),
                    style: 'cancel'
                  }
                ],
                { cancelable: false }
              )
            }
          />
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
        {isEmergency && (
          <Button variant={null} func={() => Linking.openURL(`tel:${+33122334455}`)}>
            Appeler l'opérateur
          </Button>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: colors['midnight-blue'],
    marginBottom: 10
  }
});