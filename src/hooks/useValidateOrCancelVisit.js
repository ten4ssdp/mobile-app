import { useState, useContext } from 'react';
import { AsyncStorage } from 'react-native';

import { onRefresh } from '../context/action/main';
import { MainStore } from '../context/store/main';
import http from '../utils/http';

function useValidateOrCancelVisit({ isValidation }) {
  const [res, setRes] = useState(null);
  const { dispatch } = useContext(MainStore);

  const handleSubmit = async ({ id, body: { description } }) => {
    const status = isValidation ? 1 : -1;

    const res = await http.post(
      `visit/${id}`,
      { status, description },
      {
        headers: { authorization: `bearer ${await AsyncStorage.getItem('token')}` },
        isUpdate: true
      }
    );

    onRefresh(dispatch, true);
    if (res !== null) setRes(res);

    return res;
  };

  return { handleSubmit, res };
}

export default useValidateOrCancelVisit;
