import {createStore, applyMiddleware, compose} from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import * as createLogger from 'redux-logger';
import {hashHistory} from 'react-router';
import {routerMiddleware} from 'react-router-redux';
import rootReducer from '../rootReducer';
import rootSaga from '../rootSaga';

const logger = createLogger({
	level: 'debug',
	collapsed: true
});
const router = routerMiddleware(hashHistory);
const sagaMiddleware = createSagaMiddleware();

declare let window: any;
declare let module: any;

const enhancer = compose(
	applyMiddleware(reduxImmutableStateInvariant(), sagaMiddleware, router, logger),
	window.devToolsExtension ? window.devToolsExtension() : noop => noop
);

export function configureStore(initialState) {
	const store = createStore(rootReducer, initialState, enhancer);
	sagaMiddleware.run(rootSaga);

	if (module.hot) {
		module.hot.accept('../rootReducer', () =>
			store.replaceReducer(require('../rootReducer').default)
		);
	}

	return store;
}
