import {takeLatest} from 'redux-saga';
import {put, select} from 'redux-saga/effects';
import {REQUEST_CHANGE_INSTANCE} from '../../instance/ssh/ssh.action-types';
import {requestLoginSSH, changeInstanceFailed} from '../../instance/ssh/ssh.actions';

function* changeInstance(conn, stream, {appInstance}) {
	try {
		let app = yield select((state: any) => state.ssh.app);

		stream.close();
		conn.end();

		yield put(requestLoginSSH(app, appInstance));
	} catch (err) {
		yield put(changeInstanceFailed());
	}
}

export function* sshInstanceChangeSaga(conn, stream) {
	yield* takeLatest(REQUEST_CHANGE_INSTANCE, changeInstance, conn, stream);
}
