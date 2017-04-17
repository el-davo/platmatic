import {takeEvery, delay} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {REFRESH_TOKEN} from '../../settings/settings.action-types';
import {refreshCloudToken} from './token.service';
import {getSettings, saveToken} from '../../settings/service/settings.service';
import {getControllerInfo} from '../controller/controller.service';
import {tokenRefreshed, refreshToken, invalidLogin, setActiveInstance} from '../../settings/settings.actions';
import {Instance} from "../../settings/settings.state";

function* refresh({instance}: {instance: Instance}) {
	try {
		let controllerInfo = yield call(getControllerInfo, instance);

		let token = yield call(refreshCloudToken, instance, controllerInfo);

		let settings = yield call(getSettings);

		yield call(saveToken, {
			...settings,
			cfInstances: {...settings.cfInstances, [instance.cfInstance]: {...instance, token: token.body}}
		});

		yield put(tokenRefreshed({...instance, token: token.body}));

		if (instance.primary) {
			yield put(setActiveInstance(instance));
		}

		yield call(delay, (token.body.expires_in * 1000) - 60000);

		yield put(refreshToken({...instance, token: token.body}));
	} catch (e) {
		console.log(e);

		yield put(invalidLogin(instance));
	}
}

export function* refreshTokenSaga() {
	yield* takeEvery(REFRESH_TOKEN, refresh);
}
