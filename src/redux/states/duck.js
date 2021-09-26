import {createActions, createReducer} from 'reduxsauce';

const INITIAL_STATE = {
  states: [],
};

/**
 * Action types & creators
 */
export const {Types, Creators} = createActions({
  setStates: ['states'],
  getStates: [null],
});

/**
 * Handlers
 */
const setStates = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    states: action.states,
  };
};

/**
 * Reducer
 */
export default createReducer(INITIAL_STATE, {
  [Types.SET_STATES]: setStates,
});
