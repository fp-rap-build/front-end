import { message } from 'antd';
import { axiosWithAuth } from '../../api/axiosWithAuth';

import { setLoading } from '../global/globalActions';

export const setCurrentUser = currentUser => {
  return { type: 'SET_CURRENT_USER', payload: currentUser };
};

export const setErrorMessage = message => {
  return { type: 'SET_ERROR_MESSAGE', payload: message };
};

export const clearErrorMessage = () => {
  return setErrorMessage('');
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

export const logOut = history => dispatch => {
  // Remove token from localStorage

  localStorage.removeItem('token');

  // Logout

  dispatch({ type: 'LOG_OUT' });

  // Redirect to landing page

  history.push('/landing');
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

    const message = error?.response?.data?.message || 'Internal server error';

    dispatch(setErrorMessage(message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const registerAndApply = (userValues, history) => async dispatch => {
  // Values directly attached to their account

  const user = {
    firstName: userValues.firstName,
    lastName: userValues.lastName,
    email: userValues.email,
    password: userValues.password,
    role: userValues.role,
    familySize: userValues.familySize,
    monthlyIncome: Number(userValues.monthlyIncome),
    isRequestingAssistance: true,
  };

  // Address information

  const userAddress = {
    address: userValues.address,
    cityName: userValues.cityName,
    zipCode: userValues.zipCode,
    state: userValues.state,
  };

  dispatch(setLoading(true));

  try {
    // Register an account

    let res = await axiosWithAuth().post('/auth/register', user);

    // Login

    const token = res.data.token;
    const currentUser = res.data.user;

    localStorage.setItem('token', token);

    dispatch(setCurrentUser(currentUser));

    // Update address information

    await axiosWithAuth().put('/users/me/address', userAddress);

    history.push('/');
  } catch (error) {
    const message = error?.response?.data?.message || 'Internal server error';

    dispatch(setErrorMessage(message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const setCurrentUserStatic = (user, history) => {
  history.push('/');
  return { type: 'SET_CURRENT_USER', payload: user };
};
