import {takeEvery} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {REQUEST_LOGOUT} from '../settings.action-types';
import {logout} from '../service/settings.service';
import {loggedOut} from '../settings.actions';
import {cancelEvents} from '../../instance/events/events.actions';

function* fetch() {
  try {
    yield call(logout);

    yield put(loggedOut());

    yield put(cancelEvents());
  } catch (err) {

  }
}

export function* logoutSaga() {
  yield* takeEvery(REQUEST_LOGOUT, fetch);
}
