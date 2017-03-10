import {takeEvery, delay} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {REFRESH_TOKEN} from '../../settings/settings.action-types';
import {refreshCloudToken} from './token.service';
import {saveToken} from '../../settings/service/settings.service';
import {getControllerInfo} from '../controller/controller.service';
import {tokenRefreshed, refreshToken, invalidLogin} from '../../settings/settings.actions';

function* refresh() {
	try {
		let settings = yield select((state: any) => state.settings);

		let controllerInfo = yield call(getControllerInfo, settings);

		let token = yield call(refreshCloudToken, settings, controllerInfo);

		yield call(saveToken, settings.cfInstance, token.body);

		yield put(tokenRefreshed(token.body));

		yield call(delay, (token.body.expires_in * 1000) - 60000);

		yield put(refreshToken());
	} catch (e) {
		console.log(e);

		yield put(invalidLogin());
	}
}

export function* refreshTokenSaga() {
	yield* takeEvery(REFRESH_TOKEN, refresh);
}
