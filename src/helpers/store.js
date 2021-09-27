import {store} from '../redux/configureStore';

export const getUserFromStore = () => {
  const {auth} = store.getState();
  return auth.user;
};

export const getStatesWithTextAndValue = () => {
  const {states} = store.getState();
  return states.states.map(state => ({text: state.uf, value: state.id}));
};

export const userHasInterests = () => {
  const {
    auth: {user},
  } = store.getState();

  return user.interests && user.interests.length > 0;
};
