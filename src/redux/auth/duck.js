import {createActions, createReducer} from 'reduxsauce';

const INITIAL_STATE = {
  authenticated: false,
  isLoading: false,
  token: '',
  user: {},
};

/**
 * Action types & creators
 */
export const {Types, Creators} = createActions({
  isAuthenticated: [null],
  userLoggedIn: ['user'],
  userLoggedOut: [null],
});

/**
 * Handlers
 */
const userLoggedIn = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    authenticated: true,
    user: action.user,
  };
};

const userLoggedOut = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    authenticated: false,
    user: {},
  };
};

const isAuthenticated = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    authenticated: true,
  };
};

/**
 * Reducer
 */
export default createReducer(INITIAL_STATE, {
  [Types.USER_LOGGED_IN]: userLoggedIn,
  [Types.USER_LOGGED_OUT]: userLoggedOut,
  [Types.IS_AUTHENTICATED]: isAuthenticated,
});
