import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import Sagas from './sagas';
import {persistStore, persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import reducersDucks from './ducks';

const sagaMiddleware = createSagaMiddleware();

const config = {
  key: 'appsoma',
  storage: AsyncStorage,
};

const reducer = persistCombineReducers(config, reducersDucks);

let store = createStore(reducer, applyMiddleware(sagaMiddleware));
let persistor = persistStore(store);

sagaMiddleware.run(Sagas);
export {persistor, store};
