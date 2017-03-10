import {takeLatest} from 'redux-saga';
import {call, take, put} from 'redux-saga/effects';
import {REGISTER_LOG_STREAM_CALLBACK} from '../../instance/logs/logs.action-types';
import {listenToWebsocket} from './logs.service';

function* listen(ws, {callback}) {
  try {
    let channel = yield call(listenToWebsocket, ws);

    while (true) {
      let action = yield take(channel);
      callback(action.data);

      yield put(action);
    }
  } catch (err) {
    console.log(err);
  }
}

export function* logsListenerSaga(ws) {
  yield* takeLatest(REGISTER_LOG_STREAM_CALLBACK, listen, ws);
}
