import * as Linking from 'expo-linking';

export const phoneCall = (phoneNumber) => Linking.openURL(`tel:${phoneNumber}`);
