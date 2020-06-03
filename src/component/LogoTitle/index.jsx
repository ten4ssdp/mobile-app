import React from 'react';
import { Image } from 'react-native';

export default function LogoTitle() {
  return <Image source={require('../../../assets/images/logo.png')} resizeMode="contain" />;
}
