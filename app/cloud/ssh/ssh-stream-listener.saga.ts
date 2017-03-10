import {takeLatest} from 'redux-saga';
import {call, put, take} from 'redux-saga/effects';
import {listenToStream} from './ssh.service';
import {REGISTER_CALLBACK_LISTENER} from '../../instance/ssh/ssh.action-types';

function* listen(stream, {callback}) {
  try {
    let channel = yield call(listenToStream, stream);

    while (true) {
      let action = yield take(channel);
      callback(action.response);

      yield put(action);
    }
  } catch (err) {
    console.log(err);
  }
}

export function* sshStreamListenerSaga(stream) {
  yield* takeLatest(REGISTER_CALLBACK_LISTENER, listen, stream);
}
