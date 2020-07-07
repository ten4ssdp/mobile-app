import React, { useContext, useEffect } from 'react';
import { Modal, View, StyleSheet, Dimensions, Alert } from 'react-native';

import { onOpenConfirmationModal } from '../../context/action/main';
import { MainStore } from '../../context/store/main';
import useValidateOrCancelVisit from '../../hooks/useValidateOrCancelVisit';
import colors from '../../utils/colors';
import Button from '../Button';
import Bold from '../Font/Bold';

const { width, height } = Dimensions.get('screen');

export default function ModalConfirmation() {
  const { state, dispatch } = useContext(MainStore);
  const { handleSubmit, res } = useValidateOrCancelVisit({ isValidation: true });

  useEffect(() => {
    if (res === null) {
      return undefined;
    }

    if (res.status === 1) {
      Alert.alert('CONFIRMATION', 'Visite finalisée');
    }
  }, [res]);

  return (
    <Modal
      animationType="fade"
      visible={state.isConfirmationModalOpen}
      style={styles.container}
      presentationStyle="overFullScreen"
      transparent
    >
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
            backgroundColor: 'white',
            height: height / 5,
            borderRadius: 7,
            overflow: 'hidden',
            width: width - 50,
            alignItems: 'center'
          }}
        >
          <Bold
            style={{
              fontSize: 20,
              marginBottom: 20,
              paddingTop: 30,
              color: colors['planning-default-color']
            }}
          >
            CONFIRMATION
          </Bold>

          <Bold>Avez-vous terminez la visite ?</Bold>
          <View style={styles.btnContainer}>
            <Button
              variant="default"
              style={{ ...styles.btn, borderRadius: 0 }}
              func={() => {
                onOpenConfirmationModal(dispatch, false);
                handleSubmit({ id: state.hotelInfo.visitId, body: { description: '' } });
              }}
            >
              Confirmer
            </Button>
            <Button
              variant="default"
              style={{
                ...styles.btn,
                backgroundColor: '#FF7777',
                borderRadius: 0
              }}
              func={async () => {
                onOpenConfirmationModal(dispatch, false);
              }}
            >
              Annuler
            </Button>
          </View>
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  },
  btn: {
    width: (width - 50) / 2
  }
});
