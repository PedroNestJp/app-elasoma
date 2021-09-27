import {all} from 'redux-saga/effects';
import statesSaga from './states/saga';

export default function* rootSaga(getState) {
  yield all([statesSaga()]);
}
