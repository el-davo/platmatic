import {takeEvery} from 'redux-saga';
import {call, select} from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import {STOP_APP} from '../../instance/apps/apps.action-types';
import {stopApp} from './apps.service';

function* stop({guid}) {
	try {
		let settings = yield select((state: any) => state.settings);

		yield call(stopApp, settings, guid);

		toastr.success('Alert', 'App stopped successfully');
	} catch (e) {
		console.log(e);

		toastr.success('Error', 'Unable to stop app');
	}
}

export function* appStopSaga() {
	yield* takeEvery(STOP_APP, stop);
}
