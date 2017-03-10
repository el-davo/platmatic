import {takeEvery, takeLatest, END} from 'redux-saga';
import {put} from 'redux-saga/effects';
import {REQUEST_TERMINATE_LOG_STREAM} from '../../instance/logs/logs.action-types';
import {logStreamTerminateSuccess, logStreamTerminateFailed} from '../../instance/logs/logs.actions';

function* terminate(ws) {
  try {
    ws.terminate();

    yield put(logStreamTerminateSuccess());
  } catch (err) {
    yield put(logStreamTerminateFailed());
  }
}

export function* logsStreamTerminateSaga(ws) {
  yield* takeLatest(REQUEST_TERMINATE_LOG_STREAM, terminate, ws);
}
