import React, { useContext, useState } from 'react';
import {
  Modal,
  View,
  StyleSheet,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { onOpenModal } from '../../context/action/main';
import { MainStore } from '../../context/store/main';
import useValidateOrCancelVisit from '../../hooks/useValidateOrCancelVisit';
import Button from '../Button';
import Bold from '../Font/Bold';

const { width, height } = Dimensions.get('screen');

export default function MyModal() {
  const [value, setValue] = useState();
  const { state, dispatch } = useContext(MainStore);

  const { handleSubmit } = useValidateOrCancelVisit({ isValidation: false });

  return (
    <Modal
      visible={state.isModalOpen}
      presentationStyle="overFullScreen"
      animationType="fade"
      transparent
      style={styles.container}
    >
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              width: width - 50,
              backgroundColor: 'white',
              height: height / 2.5,
              borderRadius: 7,
              overflow: 'hidden',
              alignItems: 'center',
              paddingTop: 20
            }}
          >
            <Bold style={styles.title}>
              Pour quelle raison voulez-vous annuler la visite pour {state.hotelInfo.hotelName} ?
            </Bold>
            <View style={styles.textAreaContainer}>
              <TextInput
                style={styles.textArea}
                placeholder="Ex: Accident de la route"
                multiline
                numberOfLines={10}
                onChangeText={(text) => setValue(text)}
              />
            </View>

            <View style={styles.btnContainer}>
              <Button
                variant="default"
                style={{ ...styles.btn, borderRadius: 0 }}
                func={() => {
                  onOpenModal(dispatch, false);
                  handleSubmit({ id: state.hotelInfo.visitId, body: { description: value } });
                }}
              >
                Envoyer
              </Button>
              <Button
                variant="default"
                style={{
                  ...styles.btn,
                  backgroundColor: '#FF7777',
                  borderRadius: 0
                }}
                func={async () => {
                  onOpenModal(dispatch, false);
                }}
              >
                Annuler
              </Button>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    paddingTop: 5,
    paddingLeft: 10,
    width: '90%'
  },
  textArea: {
    justifyContent: 'flex-start',
    height: '90%',
    width: '95%'
  },
  title: {
    fontSize: 20,
    textAlign: 'center'
  },
  btnContainer: {
    marginTop: 20,
    flexDirection: 'row',
    width: width - 50,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0
  },
  btn: {
    width: (width - 50) / 2
  }
});
