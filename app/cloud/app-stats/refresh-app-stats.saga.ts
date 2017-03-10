import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { REFRESH_APP_STATS } from '../../instance/app-stats/app-stats.action-types';
import { updateAppStatsMemCpu } from '../../instance/app-stats/app-stats.actions';
import {
  fetchAppSummary,
  fetchAppStats,
  fetchAppServiceBindings,
  fetchAppEnvironmentVariables
} from './app-stats.service';

function* refresh({guid}) {
  try {
    let settings = yield select((state: any) => state.settings);

    let stats = yield call(fetchAppStats, settings, guid);

    yield put(updateAppStatsMemCpu(stats));
  } catch (e) {
    console.log(e);
  }
}

export function* refreshAppStatsSaga() {
  yield* takeLatest(REFRESH_APP_STATS, refresh);
}
