import { useEffect, useState, useContext } from 'react';
import { AsyncStorage } from 'react-native';

import { getVisitsAction, getCurrentDayVisits } from '../context/action/main';
import { MainStore } from '../context/store/main';
import { UserStore } from '../context/store/user';
import { formatDateForMickey, getFirstDay } from '../utils/formatDate';
import http from '../utils/http';

function useFetchDataApp() {
  const [visits, setVisits] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [teamId, setTeamId] = useState(null);
  const { userState } = useContext(UserStore);
  const { state, dispatch: mainDispatch } = useContext(MainStore);

  useEffect(() => {
    setLoading(true);
    async function getToken() {
      const token = await AsyncStorage.getItem('token');
      setToken(token);
    }
    getToken();
  }, []);

  useEffect(() => {
    const getVisits = async () => {
      try {
        const res = await http.get(
          `visits/user/${userState.user.id}/${formatDateForMickey(getFirstDay(new Date()))}`,
          {
            authorization: `bearer ${token}`
          }
        );

        await getVisitsAction(mainDispatch, res.visits);

        // setTeamId(await res.visits[0].teamId);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    };

    if (state.visits === null) {
      getVisits();
    }
  }, [token]);

  //   useEffect(() => {
  //     async function fetchTeam() {
  //       const res = await http.get(`mickey/teams/${}`);
  //     }
  //   });

  useEffect(() => {
    function currentDayVisits() {
      const today = new Date();
      const filteredVisits = state.visits?.filter((visit) => {
        return visit.status === 0 && new Date(visit.start).getDate() === today.getDate();
      });
      setVisits(filteredVisits);
      getCurrentDayVisits(mainDispatch, filteredVisits);
      setLoading(false);
    }

    currentDayVisits();
  }, [state.visits]);

  return {
    visits,
    loading
  };
}

export default useFetchDataApp;
