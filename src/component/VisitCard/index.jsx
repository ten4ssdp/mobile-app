import React from 'react';
import { View, StyleSheet, Dimensions, ImageBackground, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import colors from '../../utils/colors';
import Bold from '../Font/Bold';

const { width } = Dimensions.get('window');

export default function VisitCard() {
  return (
    <View style={styles.card}>
      <ImageBackground
        style={styles.imageContainer}
        source={require('../../../assets/images/default-visit-hotel.png')}
        resizeMode="contain"
      >
        <View style={styles.hotelNameContainer}>
          <Bold style={styles.hotelName}>Hello</Bold>
        </View>
      </ImageBackground>
      <View style={styles.addressContainer}>
        <Bold style={{ marginBottom: 3 }}>27 bis rue du progres</Bold>
        <Bold>12345 Montreuil</Bold>
      </View>
      <View style={styles.goToButtonContainer}>
        <TouchableOpacity onPress={() => console.log("j'y vais")}>
          <Bold style={{ color: colors['active-white'] }}>S'y rendre</Bold>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <View style={{ ...styles.button, backgroundColor: colors['stroke-default-planning'] }}>
          <Button title="Visite Finalisée" color={colors['active-white']} />
        </View>
        <View style={{ ...styles.button, backgroundColor: colors['midnight-light-blue'] }}>
          <Button title="Détails" color={colors['active-white']} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 300,
    width: width / 1.1,
    backgroundColor: colors['active-white'],
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20
  },
  imageContainer: {
    height: 148,
    width: '100%'
  },
  hotelNameContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: colors['opacity-midnigth-blue'],
    justifyContent: 'center'
  },
  hotelName: {
    color: colors['active-white'],
    paddingLeft: 10
  },
  addressContainer: {
    paddingHorizontal: 12,
    marginVertical: 15
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    height: 45
  },
  button: {
    width: '50%'
  },
  goToButtonContainer: {
    marginLeft: 12,
    width: 90,
    height: 30,
    borderRadius: 35,
    backgroundColor: colors['midnight-blue'],
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5
  }
});
