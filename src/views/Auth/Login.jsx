import React, { useState, useContext } from 'react';
import {
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
  Keyboard,
  AsyncStorage
} from 'react-native';

import Button from '../../component/Button';
import Bold from '../../component/Font/Bold';
import Light from '../../component/Font/Light';
import PasswordInput from '../../component/Input/PasswordInput';
import Input from '../../component/Input/index';
import { setIsUserLogin } from '../../context/action/user';
import { UserStore } from '../../context/store/user';
import colors from '../../utils/colors';

const { width } = Dimensions.get('window');

export default function Login({ navigation }) {
  const [values, setValues] = useState({ email: '', password: '' });
  const { dispatch } = useContext(UserStore);

  const loginUser = async () => {
    const res = await fetch('http://15.188.3.249:5000/api/login', {
      method: 'POST',
      body: JSON.stringify({ email: values.email, password: values.password }),
      headers: {
        'content-type': 'application/json'
      }
    });
    const token = await res.json();
    await AsyncStorage.setItem('token', token.token);
    await setIsUserLogin(dispatch, true);
    return token;
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ flex: 1 }}>
        <Image
          style={{ width, resizeMode: 'cover', height: 350, padding: 10 }}
          source={require('../../../assets/images/login-image.png')}
        />
        <View
          style={{
            paddingTop: 35,
            paddingHorizontal: width / 15
          }}
        >
          <View>
            <Bold
              style={{ color: colors['stroke-default-planning'], fontSize: 25, marginBottom: 10 }}
            >
              Bienvenue
            </Bold>
          </View>
          <Light style={{ fontSize: 16 }}>
            Connectez-vous avec votre adresse mail du Samu social.
          </Light>
          <View style={{ alignItems: 'center' }}>
            <View style={{ marginTop: 37 }}>
              <Input
                placeholder="Ex: xavier.r@ssdp.fr"
                value={values.email}
                onChangeText={(text) => setValues({ ...values, email: text })}
                type="emailAddress"
              />
            </View>
            <View style={{ marginTop: 20 }}>
              <PasswordInput
                value={values.password}
                onChangeText={(text) => setValues({ ...values, password: text })}
              />
            </View>
            <View style={{ marginTop: 70 }}>
              <Button func={() => loginUser()}>Se connecter</Button>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
