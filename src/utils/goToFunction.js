import OpenMap from 'react-native-open-map';

const goToFunction = (latitude, longitude, title) => {
  OpenMap.show({
    latitude,
    longitude,
    title,
    cancelText: 'Fermer',
    actionSheetTitle: 'Choisir une application'
  });
};

export default goToFunction;
