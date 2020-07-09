import { useEffect, useState, useContext } from 'react';
import { AsyncStorage } from 'react-native';
import socketIOClient from 'socket.io-client';

import envConfig from '../../config/env.config';
import {
  getVisitsAction,
  getCurrentDayVisits,
  onRefresh,
  getUrgences,
  onShowBanner
} from '../context/action/main';
import { setIsUserLogin } from '../context/action/user';
import { MainStore } from '../context/store/main';
import { UserStore } from '../context/store/user';
import { formatDateForMickey, getFirstDay } from '../utils/formatDate';
import http from '../utils/http';

function useFetchDataApp() {
  const [visits, setVisits] = useState([]);
  const [urgences, setUrgences] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [coworker, setCoworker] = useState(null);
  const { userState, dispatch } = useContext(UserStore);
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
      setIsUserLogin(dispatch, true);
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

        if (res.error) {
          console.log(res.error);
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

    if ((state.visits === null || state.refresh) && token) {
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
    async function currentDayVisits() {
      const today = new Date();
      const filteredVisits = state.visits
        ?.filter((visit) => {
          return new Date(visit.start).getDate() === today.getDate();
        })
        .sort((a, b) => {
          if (a.status === 0) return -1;
          if (a.status !== 0) return 1;
        });

      if (!filteredVisits) return undefined;

      const emergencies = state.urgences?.filter((em) => {
        return em.status === 0;
      });

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
    const socket = socketIOClient(envConfig.production.BASE_URL, {
      forceNew: true
    });
    socket.on('connect', () => {
      socket.emit('join', token);
      socket.on('emergency', function (data) {
        console.log(data);
        onRefresh(mainDispatch, true);
        onShowBanner(mainDispatch, true);
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
