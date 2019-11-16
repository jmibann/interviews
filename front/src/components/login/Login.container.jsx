import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

import { SET_USER } from '../../../redux/constants'
import { checkUserLogin } from '../../../redux/action-creator/user';

import LoginForm from './LoginForm';

const Login = ({ history }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.name === 'email') setEmail(e.target.value);
    if (e.target.name === 'password') setPassword(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    checkUserLogin({ email, password })
      .then(user => {
        dispatch({ type: SET_USER, user });
        history.push('/');
      })
      .catch(() => toastr.error('Log in error', 'Check your email and password'));
  }

  return (
    !Object.keys(user).length ? <LoginForm onChange={handleChange} onSubmit={handleSubmit} /> : <Redirect to='/' />
  );
}

export default Login;