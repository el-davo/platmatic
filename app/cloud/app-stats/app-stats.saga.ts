import { takeLatest } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { FETCH_APP_STATS } from '../../instance/app-stats/app-stats.action-types';
import {
  fetchAppSummary,
  fetchAppStats,
  fetchAppServiceBindings,
  fetchAppEnvironmentVariables
} from './app-stats.service';
import { updateAppStats } from '../../instance/app-stats/app-stats.actions';

function* fetch({guid}) {
  try {
    let settings = yield select((state: any) => state.settings);

    let [summary, stats, serviceBindings, environmentVariables] = yield [
      call(fetchAppSummary, settings, guid),
      call(fetchAppStats, settings, guid),
      call(fetchAppServiceBindings, settings, guid),
      call(fetchAppEnvironmentVariables, settings, guid)
    ];

    yield put(updateAppStats(stats, summary, serviceBindings.resources, environmentVariables));
  } catch (e) {
    console.log(e);
  }
}

export function* appStatsSaga() {
  yield* takeLatest(FETCH_APP_STATS, fetch);
}
