import { useState, useEffect, useContext } from 'react';
import { AsyncStorage } from 'react-native';

import { onRefresh } from '../context/action/main';
import { MainStore } from '../context/store/main';
import http from '../utils/http';

function useValidateOrCancelVisit({ isValidation }) {
  const [token, setToken] = useState('');
  const { dispatch } = useContext(MainStore);
  useEffect(() => {
    async function getToken() {
      const token = await AsyncStorage.getItem('token');
      setToken(token);
    }
    getToken();
  }, []);

  const headers = {
    authorization: `bearer ${token}`
  };
  const handleSubmit = async ({ id, body: { description } }) => {
    const status = isValidation ? 1 : -1;

    const res = await http.post(
      `visit/${id}`,
      { status, description },
      { headers, isUpdate: true }
    );
    onRefresh(dispatch, true);
    console.log(res);
  };

  return { handleSubmit };
}

export default useValidateOrCancelVisit;
