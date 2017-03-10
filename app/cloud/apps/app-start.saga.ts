import {takeEvery} from 'redux-saga';
import {call, select} from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';

import {START_APP} from '../../instance/apps/apps.action-types';
import {startApp} from './apps.service';

function* start({guid}) {
	try {
		let settings = yield select((state: any) => state.settings);

		yield call(startApp, settings, guid);

		toastr.success('Alert', 'App started successfully');
	} catch (e) {
		console.log(e);

		toastr.success('Error', 'Unable to start app');
	}
}

export function* appStartSaga() {
	yield* takeEvery(START_APP, start);
}
