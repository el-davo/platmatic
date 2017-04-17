import {takeLatest} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import {REQUEST_SCALE_APP} from '../../instance/app-stats/app-stats.action-types';
import {scaleApp, stopApp, startApp} from '../apps/apps.service';
import {
	fetchAppSummary,
	fetchAppStats,
	fetchAppServiceBindings,
	fetchAppEnvironmentVariables
} from './app-stats.service';
import {scaleAppCompleted, updateAppStats, closeScaleDialog} from '../../instance/app-stats/app-stats.actions';
import {SettingsState} from "../../settings/settings.state";

function* scale({guid, instances, memory, disk}) {
	try {
		let settings: SettingsState = yield select((state: any) => state.settings);

		yield call(scaleApp, settings.activeInstance, guid, parseInt(instances), parseInt(memory), parseInt(disk));

		yield call(stopApp, settings.activeInstance, guid);

		yield call(startApp, settings.activeInstance, guid);

		let [summary, stats, serviceBindings, environmentVariables] = yield [
			call(fetchAppSummary, settings.activeInstance, guid),
			call(fetchAppStats, settings.activeInstance, guid),
			call(fetchAppServiceBindings, settings.activeInstance, guid),
			call(fetchAppEnvironmentVariables, settings.activeInstance, guid)
		];

		yield put(updateAppStats(stats, summary, serviceBindings.resources, environmentVariables));

		yield put(closeScaleDialog());

		yield put(scaleAppCompleted());

		toastr.success('Success', 'App has been scaled');
	} catch (e) {
		console.log(e);

		yield put(scaleAppCompleted());

		toastr.error('Error', 'An error occurred scaling app');
	}
}

export function* scaleAppSaga() {
	yield* takeLatest(REQUEST_SCALE_APP, scale);
}
