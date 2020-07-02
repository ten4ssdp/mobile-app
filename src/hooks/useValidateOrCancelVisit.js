import { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

import http from '../utils/http';

function useValidateOrCancelVisit({ isValidation }) {
  const [token, setToken] = useState('');
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

    console.log(res);
  };

  return { handleSubmit };
}

export default useValidateOrCancelVisit;
