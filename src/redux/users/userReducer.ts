const INITIAL_STATE = {
  isLoggedIn: false,
  currentUser: {},
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload, isLoggedIn: true };
    case 'LOG_OUT':
      return { ...state, isLoggedIn: false, currentUser: {} };
    default:
      return state;
  }
};

export default userReducer;
