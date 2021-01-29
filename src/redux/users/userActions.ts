import { axiosWithAuth } from '../../api/axiosWithAuth';

export const setCurrentUser = () => async dispatch => {
  dispatch({ type: 'LOG_IN' });
  dispatch({ type: 'SET_LOADING', payload: true });
  try {
    let currentUser = await axiosWithAuth()
      .get('/users/me')
      .then(res => res.data.user);
    dispatch({ type: 'SET_CURRENT_USER', payload: currentUser });
  } catch (error) {
    alert('error');
    console.log(error);
    console.log(error?.response);
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};
