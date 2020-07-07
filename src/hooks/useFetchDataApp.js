import { useEffect, useState, useContext } from 'react';
import { AsyncStorage } from 'react-native';
import socketIOClient from 'socket.io-client';

import {
  getVisitsAction,
  getCurrentDayVisits,
  onRefresh,
  getUrgences
} from '../context/action/main';
import { MainStore } from '../context/store/main';
import { UserStore } from '../context/store/user';
import { BASE_API_URL } from '../utils/constant';
import { formatDateForMickey, getFirstDay } from '../utils/formatDate';
import http from '../utils/http';

function useFetchDataApp() {
  const [visits, setVisits] = useState([]);
  const [urgences, setUrgences] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [coworker, setCoworker] = useState(null);
  const { userState } = useContext(UserStore);
  const { state, dispatch: mainDispatch } = useContext(MainStore);
  const firstWeekDay = formatDateForMickey(getFirstDay(new Date()));

  const headers = {
    authorization: `bearer ${token}`
  };

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
        const res = await http.get(`visits/user/${userState.user.id}/${firstWeekDay}`, headers);
        if (res === undefined || res === null) {
          throw new Error('Visits return undefined or null');
        }
        if (res.emergencies) {
          await getUrgences(mainDispatch, res.emergencies);
        }
        await getVisitsAction(mainDispatch, res.visits);
      } catch (error) {
        console.error(error.message);
        setLoading(false);
      }
    };

    if (state.visits === null || state.refresh) {
      getVisits();
    }
  }, [token, state.refresh]);

  useEffect(() => {
    async function fetchTeam() {
      const res = await http.get(`teams/${userState.user.id}/${firstWeekDay}`, headers);

      const coworker =
        res !== null &&
        res[0]?.users.filter(
          (user) => user.name !== userState.user.name && user.lastname !== userState.user.lastname
        );

      setCoworker(coworker);
    }
    fetchTeam();
  }, [token]);

  useEffect(() => {
    function currentDayVisits() {
      const today = new Date();
      const filteredVisits = state.visits?.filter((visit) => {
        return visit.status === 0 && new Date(visit.start).getDate() === today.getDate();
      });
      const emergencies = state.urgences?.filter((em) => em.status === 0);
      setUrgences(emergencies);
      setVisits(filteredVisits);
      getCurrentDayVisits(mainDispatch, filteredVisits);
      getUrgences(mainDispatch, emergencies);
      setLoading(false);
      onRefresh(mainDispatch, false);
    }

    currentDayVisits();
  }, [state.visits, state.refresh]);

  useEffect(() => {
    const socket = socketIOClient(BASE_API_URL);
    socket.on('connect', () => {
      socket.emit('join', token);
      socket.on('emergency', async function (data) {
        onRefresh(mainDispatch, true);
      });
    });
  }, []);

  return {
    visits,
    loading,
    coworker,
    urgences
  };
}

export default useFetchDataApp;
