import { axiosWithAuth } from '../../api/axiosWithAuth';

import { setLoading } from '../global/globalActions';

import createOktaAccount from './utils/createOktaAccount';

export const setCurrentUser = currentUser => {
  return { type: 'SET_CURRENT_USER', payload: currentUser };
};

export const fetchCurrentUser = () => async dispatch => {
  dispatch(setLoading(true));
  try {
    let res = await axiosWithAuth().get('/users/me');

    let currentUser = res.data.user;
    dispatch({ type: 'SET_CURRENT_USER', payload: currentUser });
  } catch (error) {
    alert('error');
  } finally {
    dispatch(setLoading(false));
  }
};

export const logIn = (user, history) => async dispatch => {
  dispatch(setLoading(true));

  try {
    // Login

    const res = await axiosWithAuth().post('/auth/login', user);

    // Store the token in localStorage

    const token = res.data.token;

    localStorage.setItem('token', token);

    // Set the user in state

    const currentUser = res.data.user;

    dispatch(setCurrentUser(currentUser));

    // Nothing went wrong, let's redirect the user to the homepage

    history.push('/');
  } catch (error) {
    // Set error into global state

    alert('error');
  } finally {
    dispatch(setLoading(false));
  }
};

export const registerAndApply = (
  userInfo,
  addressInfo,
  history
) => async dispatch => {
  const user = {
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    password: userInfo.password,
    role: userInfo.role,
  };

  dispatch(setLoading(true));

  try {
    await createOktaAccount(user);
    await axiosWithAuth().put('/users/me', userInfo);
    await axiosWithAuth().put('/users/me/address', addressInfo);

    history.push('/');
  } catch (error) {
    alert('error');
    console.log(error.response);
  } finally {
    setLoading(false);
  }
};

export const setCurrentUserStatic = (user, history) => {
  history.push('/');
  return { type: 'SET_CURRENT_USER', payload: user };
};
