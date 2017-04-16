import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {REQUEST_GET_SETTINGS} from '../settings.action-types';
import {getSettings} from '../service/settings.service';
import {invalidLogin, retrievedSettings, refreshToken, openAddCfInstanceDialog} from '../settings.actions';
import {Settings} from '../settings.interface';

function* fetch() {
	try {
		let settings: Settings = yield call(getSettings);

		yield put(retrievedSettings(settings));

		for (let key of Object.keys(settings.cfInstances)) {
			yield put(refreshToken(settings.cfInstances[key]));
		}
	} catch (e) {
		console.log(e);

		yield put(invalidLogin());

		yield put(openAddCfInstanceDialog());
	}
}

export function* getSettingsSaga() {
	yield* takeEvery(REQUEST_GET_SETTINGS, fetch);
}
