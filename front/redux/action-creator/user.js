import { SET_USER, SET_USERS } from '../constants';
import axios from 'axios';

export const setUser = (user) => ({ type: SET_USER, user });
const setUsers = (users) => ({ type: SET_USERS, users });

export const checkUserLogin = (data) => {
  return axios.post('/api/user/login', data).then(res => res.data).then(usuario => usuario);
}

export const createUser = (user) => () => axios.post('/api/user/create', { user });

export const fetchUser = () =>
  dispatch =>
    axios.get('/api/user/user').then(res => res.data).then(user => dispatch(setUser(user)));

export const logOut = () =>
  dispatch =>
    axios.get('/api/user/logOut').then(res => res.data).then(user => {
      dispatch(setUser(user));
    });

export const getAllUsers = () =>
  dispatch =>
    axios.get('/api/user/getAll').then(res => res.data).then(users => dispatch(setUsers(users)));