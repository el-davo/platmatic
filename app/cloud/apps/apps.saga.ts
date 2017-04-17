import {takeLatest} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {FETCH_APPS} from '../../instance/apps/apps.action-types';
import {fetchAppsInSpace} from './apps.service';
import {updateApps} from '../../instance/apps/apps.actions';
import {SettingsState} from "../../settings/settings.state";

function* fetch({guid}) {
  try {
    let settings: SettingsState = yield select((state: any) => state.settings);
    let apps = yield select((state: any) => state.apps);

    let results = yield call(fetchAppsInSpace, settings.activeInstance, guid, apps);

    yield put(updateApps(results));

  } catch (e) {
    console.log(e);
  }
}

export function* appsSaga() {
  yield* takeLatest(FETCH_APPS, fetch);
}
