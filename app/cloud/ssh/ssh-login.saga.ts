import {takeLatest} from 'redux-saga';
import {call, put, select, fork} from 'redux-saga/effects';
import {parse} from 'url';
import {getOneTimePassword, loginSSH} from './ssh.service';
import {getControllerInfo} from '../controller/controller.service';
import {REQUEST_LOGIN_SSH} from '../../instance/ssh/ssh.action-types';
import {loggedInSSH, loginSSHFailed} from '../../instance/ssh/ssh.actions';
import {sshStreamListenerSaga} from'./ssh-stream-listener.saga';
import {sshStreamWriteSaga} from'./ssh-stream-write.saga';
import {sshStreamTerminateSaga} from './ssh-stream-terminate.saga';
import {sshInstanceChangeSaga} from './ssh-instance-change.saga';
import {SettingsState} from "../../settings/settings.state";
import {controllerInfo} from "../controller/controllerInfo.interface";

function* login({app, appInstance}) {
	try {
		let settings: SettingsState = yield select((state: any) => state.settings);

		let cfInfo: controllerInfo = yield call(getControllerInfo, settings.activeInstance);

		let password = yield call(getOneTimePassword, settings.activeInstance, cfInfo);

		password = parse(password.message.headers.location).query.split('=')[1];

		let {conn, stream} = yield call(loginSSH, cfInfo, password, app.metadata.guid, appInstance);

		yield put(loggedInSSH());

		yield [
			fork(sshStreamListenerSaga, stream),
			fork(sshStreamWriteSaga, stream),
			fork(sshStreamTerminateSaga, conn, stream),
			fork(sshInstanceChangeSaga, conn, stream)
		];

	} catch (err) {
		console.log(err);

		yield put(loginSSHFailed(err));
	}
}

export function* sshLoginSaga() {
	yield* takeLatest(REQUEST_LOGIN_SSH, login);
}
