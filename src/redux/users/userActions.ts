import { axiosWithAuth } from '../../api/axiosWithAuth';

export const setCurrentUser = () => async dispatch => {
  dispatch({ type: 'SET_LOADING', payload: true });
  dispatch({
    type: 'SET_CURRENT_USER',
    payload: { email: 'test', name: 'test' },
  });
  try {
    let currentUser = await axiosWithAuth()
      .get('/users/me')
      .then(res => res.data.user);
    dispatch({ type: 'SET_CURRENT_USER', payload: currentUser });
  } catch (error) {
    alert('error');
  } finally {
    dispatch({ type: 'SET_LOADING', payload: false });
  }
};
