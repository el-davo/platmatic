import {takeEvery} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import {REQUEST_LOGIN} from '../settings.action-types';
import {controllerInfo} from '../../cloud/controller/controllerInfo.interface';
import {getControllerInfo} from '../../cloud/controller/controller.service';
import {login} from '../../cloud/user/login.service';
import {ensureSettingsDirectoryExists, saveToken} from '../service/settings.service';
import {loggedIn, refreshToken, invalidLogin} from '../settings.actions';
import {CfInstance, SettingsState} from '../settings.state';

function* fetch({cfInstance, username, password}) {
	try {
		let settings: SettingsState = yield select((state: any) => state.settings);

		let controllerInfo: controllerInfo = yield call(getControllerInfo, {cfInstance});

		let token = yield call(login, controllerInfo.authorization_endpoint, username, password);

		yield call(ensureSettingsDirectoryExists);

		yield call(saveToken, {...settings.cfInstances, [cfInstance]: {token: token.body}});

		yield put(loggedIn({[cfInstance]: {token: token.body}} as CfInstance));

		//yield put(refreshToken());
	} catch (e) {
		console.log(e);

		toastr.error('Error', 'Invalid credentials, Please try again');

		yield put(invalidLogin());
	}
}

export function* loginSaga() {
	yield* takeEvery(REQUEST_LOGIN, fetch);
}
