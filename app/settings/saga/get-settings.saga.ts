import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {REQUEST_GET_SETTINGS} from '../settings.action-types';
import {getSettings} from '../service/settings.service';
import {invalidLogin, retrievedSettings, refreshToken} from '../settings.actions';
import {Settings} from '../settings.interface';

function* fetch() {
	try {
		let settings: Settings = yield call(getSettings);

		yield put(retrievedSettings(settings));

		//yield put(refreshToken());
	} catch (e) {
		console.log(e);

		yield put(invalidLogin());
	}
}

export function* getSettingsSaga() {
	yield* takeEvery(REQUEST_GET_SETTINGS, fetch);
}
