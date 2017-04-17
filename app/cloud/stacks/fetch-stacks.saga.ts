import {takeEvery} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {FETCH_STACKS} from '../../instance/stacks/stacks.action-types';
import {fetchStacks} from './stacks.services';
import {updateStacks} from '../../instance/stacks/stacks.actions';
import {SettingsState} from "../../settings/settings.state";

function* fetch() {
	try {
		let settings: SettingsState = yield select((state: any) => state.settings);

		let stacks = yield call(fetchStacks, settings.activeInstance);

		yield put(updateStacks(stacks.resources));
	} catch (e) {
		console.log(e);
	}
}

export function* fetchStatsSaga() {
	yield* takeEvery(FETCH_STACKS, fetch);
}
