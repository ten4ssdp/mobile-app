import React, { useState, useContext } from 'react';
import {
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage,
  Alert
} from 'react-native';

import Button from '../../component/Button';
import Bold from '../../component/Font/Bold';
import Light from '../../component/Font/Light';
import PasswordInput from '../../component/Input/PasswordInput';
import Input from '../../component/Input/index';
import { setIsUserLogin } from '../../context/action/user';
import { UserStore } from '../../context/store/user';
import colors from '../../utils/colors';
import http from '../../utils/http';

const { width, height } = Dimensions.get('window');

export default function Login({ navigation }) {
  const [values, setValues] = useState({ email: '', password: '' });
  const { dispatch } = useContext(UserStore);

  const showMessage = (message) => Alert.alert('Erreur', message);

  const loginUser = async () => {
    try {
      const res = await http.post('login', { email: values.email, password: values.password });
      await AsyncStorage.setItem('token', res.token);
      await setIsUserLogin(dispatch, true);
      return res.token;
    } catch (error) {
      showMessage(error.message);
    }
  };

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={() => Keyboard.dismiss()}>
      <View>
        <View style={styles.cover}>
          <Image
            style={{ width, resizeMode: 'cover', height: '100%', padding: 10 }}
            source={require('../../../assets/images/login-image.png')}
          />
        </View>

        <View
          style={{
            paddingHorizontal: width / 15
          }}
        >
          <View style={styles.infos}>
            <Bold
              style={{ color: colors['stroke-default-planning'], fontSize: 25, marginBottom: 10 }}
            >
              Bienvenue
            </Bold>
            <Light style={{ fontSize: 16 }}>
              Connectez-vous avec votre adresse mail du Samu social.
            </Light>
          </View>

          <View style={styles.inputs}>
            <View>
              <View>
                <Input
                  placeholder="Ex: xavier.r@ssdp.fr"
                  value={values.email}
                  onChangeText={(text) => setValues({ ...values, email: text })}
                  type="emailAddress"
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <PasswordInput
                  value={values.password}
                  onChangeText={(text) => setValues({ ...values, password: text })}
                />
              </View>
            </View>
          </View>

          <View style={styles.submit}>
            <Button func={() => loginUser()} variant="default">
              Se connecter
            </Button>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  cover: {
    height: height / 3
  },
  infos: {
    marginTop: 35,
    height: 'auto'
  },
  inputs: {
    justifyContent: 'space-around',
    height: height / 4
  },
  submit: {
    justifyContent: 'space-around',
    height: height / 4
  }
});
