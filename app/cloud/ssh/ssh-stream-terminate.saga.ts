import {takeEvery, takeLatest, END} from 'redux-saga';
import {put} from 'redux-saga/effects';
import {REQUEST_LOGOUT_SSH} from '../../instance/ssh/ssh.action-types';
import {loggedOutSSH} from '../../instance/ssh/ssh.actions';

function* terminate(conn, stream) {
  try {
    stream.close();
    conn.end();

    yield put(loggedOutSSH());
  } catch (err) {
    yield put(loggedOutSSH());
  }
}

export function* sshStreamTerminateSaga(conn, stream) {
  yield* takeLatest(REQUEST_LOGOUT_SSH, terminate, conn, stream);
}
