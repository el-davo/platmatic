import {takeLatest} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {FETCH_APP_STATS} from '../../instance/app-stats/app-stats.action-types';
import {
	fetchAppSummary,
	fetchAppStats,
	fetchAppServiceBindings,
	fetchAppEnvironmentVariables
} from './app-stats.service';
import {fetchApp} from '../apps/apps.service';
import {updateAppStats} from '../../instance/app-stats/app-stats.actions';
import {SettingsState} from "../../settings/settings.state";

function* fetch({guid}) {
	try {
		let settings: SettingsState = yield select((state: any) => state.settings);

		let [summary, stats, serviceBindings, environmentVariables, app] = yield [
			call(fetchAppSummary, settings.activeInstance, guid),
			call(fetchAppStats, settings.activeInstance, guid),
			call(fetchAppServiceBindings, settings.activeInstance, guid),
			call(fetchAppEnvironmentVariables, settings.activeInstance, guid),
			call(fetchApp, settings.activeInstance, guid)
		];

		yield put(updateAppStats(stats, summary, serviceBindings.resources, environmentVariables, app));
	} catch (e) {
		console.log(e);
	}
}

export function* appStatsSaga() {
	yield* takeLatest(FETCH_APP_STATS, fetch);
}
