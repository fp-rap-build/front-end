import { axiosWithAuth } from '../../api/axiosWithAuth';

import { setLoading } from '../global/globalActions';

import createOktaAccount from './utils/createOktaAccount';

export const setCurrentUser = () => async dispatch => {
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
