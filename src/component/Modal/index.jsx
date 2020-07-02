import React, { useContext } from 'react';
import { Modal, View, StyleSheet, Dimensions } from 'react-native';

import { onOpenModal } from '../../context/action/main';
import { MainStore } from '../../context/store/main';
import colors from '../../utils/colors';
import Button from '../Button';
import Bold from '../Font/Bold';
import Input from '../Input';

const { width } = Dimensions.get('screen');

export default function MyModal() {
  const { state, dispatch } = useContext(MainStore);
  return (
    <Modal animationType="slide" visible={state.isModalOpen} presentationStyle="formSheet">
      <View style={styles.container}>
        <Bold style={styles.title}>
          Pour quelle raison voulez-vous annuler la visite pour {state.hotelName} ?
        </Bold>
        <View style={styles.textAreaContainer}>
          <Input
            style={styles.textArea}
            placeholder="Ex: Accident de la route"
            multiline
            numberOfLines={10}
          />
        </View>

        <View style={styles.btnContainer}>
          <Button
            variant="default"
            style={{ ...styles.btn, borderRadius: 0 }}
            func={() => console.log('annulée')}
          >
            Envoyer
          </Button>
          <Button
            variant="default"
            style={{
              ...styles.btn,
              backgroundColor: colors['midnight-light-blue'],
              borderRadius: 0
            }}
            func={() => onOpenModal(dispatch, false)}
          >
            Annuler
          </Button>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textAreaContainer: {
    borderColor: 'black',
    borderWidth: 1,
    height: 150,
    borderRadius: 7,
    marginTop: 30,
    paddingTop: 5
  },
  textArea: {
    justifyContent: 'flex-start'
  },
  title: {
    fontSize: 20,
    textAlign: 'center'
  },
  btnContainer: {
    marginTop: 20,
    flexDirection: 'row',
    width: width - 50,
    borderRadius: 7,
    overflow: 'hidden'
  },
  btn: {
    width: (width - 50) / 2
  }
});
