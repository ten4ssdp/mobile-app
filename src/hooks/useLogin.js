import { useContext } from 'react';
import { AsyncStorage } from 'react-native';

import { setIsUserLogin } from '../context/action/user';
import { UserStore } from '../context/store/user';
import http from '../utils/http';

function useLogin(errorFn) {
  const { dispatch } = useContext(UserStore);

  const handleLoginSubmit = async ({ email, password }) => {
    try {
      if (!email || !password) {
        throw new Error("L'adresse mail et le mot de passe est obligatoire.");
      }
      const res = await http.post('login', { email, password }, { isUpdate: false });
      await AsyncStorage.setItem('token', res.token);
      await setIsUserLogin(dispatch, true);
      return res.token;
    } catch (error) {
      errorFn(error.message);
    }
  };

  return handleLoginSubmit;
}

export default useLogin;
