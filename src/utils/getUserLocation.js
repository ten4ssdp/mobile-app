import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export async function getUserLocation() {
  const { status } = await Permissions.askAsync(Permissions.LOCATION);

  if (status !== 'granted') {
    console.log('PERMISSION NOT GRANTED');
  }

  const userLocation = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });

  return userLocation;
}
