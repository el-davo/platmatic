import {takeLatest} from 'redux-saga';
import {call, select, put, fork} from 'redux-saga/effects';
import {REQUEST_LOG_STREAM} from '../../instance/logs/logs.action-types';
import {connectToLogWebsocket} from './logs.service';
import {getControllerInfo} from '../controller/controller.service';
import {logStreamConnectSuccess, logStreamConnectFailed} from '../../instance/logs/logs.actions';
import {logsListenerSaga} from './logs-listener.saga';
import {logsStreamTerminateSaga} from './logs-terminate.saga';

function* fetch({app}) {
	try {
		let settings = yield select((state: any) => state.settings);

		let instance = yield call(getControllerInfo, settings);

		let ws = yield call(connectToLogWebsocket, settings, instance, app);

		yield [
			fork(logsListenerSaga, ws),
			fork(logsStreamTerminateSaga, ws)
		];

		yield put(logStreamConnectSuccess());

	} catch (e) {
		console.log(e);

		yield put(logStreamConnectFailed());
	}
}

export function* logsSaga() {
	yield* takeLatest(REQUEST_LOG_STREAM, fetch);
}
