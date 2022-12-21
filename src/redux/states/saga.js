import {takeEvery, call, put} from 'redux-saga/effects';
import {Types} from './duck';
import {StateActions} from '../actions';
import {getStatesService} from '../../services/states';

function* getStates() {
  try {
    const states = yield call(getStatesService);
    yield put(StateActions.setStates(states));
  } catch (e) {
    console.log(e);
  }
}

export default function* rootSaga() {
  yield takeEvery(Types.GET_STATES, getStates);
}
