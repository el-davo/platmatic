import {takeLatest} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {FETCH_APPS} from '../../instance/apps/apps.action-types';
import {fetchAppsInSpace} from './apps.service';
import {updateApps} from '../../instance/apps/apps.actions';

function* fetch({guid}) {
  try {
    let settings = yield select((state: any) => state.settings);
    let apps = yield select((state: any) => state.apps);

    let results = yield call(fetchAppsInSpace, settings, guid, apps);

    yield put(updateApps(results));

  } catch (e) {
    console.log(e);
  }
}

export function* appsSaga() {
  yield* takeLatest(FETCH_APPS, fetch);
}
