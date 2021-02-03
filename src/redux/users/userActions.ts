import { axiosWithAuth } from '../../api/axiosWithAuth';

import { setLoading } from '../global/globalActions';

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

export const setCurrentUserStatic = (user, history) => {
  history.push('/');
  return { type: 'SET_CURRENT_USER', payload: user };
};
