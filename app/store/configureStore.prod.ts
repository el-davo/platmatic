import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {hashHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';
import rootReducer from '../rootReducer';
import rootSaga from '../rootSaga';

const router = routerMiddleware(hashHistory);
const sagaMiddleware = createSagaMiddleware();

const enhancer = applyMiddleware(sagaMiddleware, router);

export function configureStore(initialState) {
	console.log('In Prod');
  const store = createStore(rootReducer, initialState, enhancer);
  sagaMiddleware.run(rootSaga);
  return store;
}
