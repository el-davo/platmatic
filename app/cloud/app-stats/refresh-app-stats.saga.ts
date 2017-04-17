import {takeLatest} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {REFRESH_APP_STATS} from '../../instance/app-stats/app-stats.action-types';
import {updateAppData, updateAppStatsMemCpu} from '../../instance/app-stats/app-stats.actions';
import {fetchAppStats} from './app-stats.service';
import {fetchApp} from '../apps/apps.service';
import {SettingsState} from "../../settings/settings.state";

function* refresh({guid}) {
	try {
		let settings: SettingsState = yield select((state: any) => state.settings);

		let [app, stats] = yield [
			call(fetchApp, settings.activeInstance, guid),
			call(fetchAppStats, settings.activeInstance, guid)
		];

		yield put(updateAppData(app));
		yield put(updateAppStatsMemCpu(stats));
	} catch (e) {
		console.log(e);
	}
}

export function* refreshAppStatsSaga() {
	yield* takeLatest(REFRESH_APP_STATS, refresh);
}
