import {takeLatest, delay} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {FETCH_EVENTS} from '../../instance/events/events.action-types';
import {fetchEvents} from './events.service';
import {fetchEvents as retry} from '../../instance/events/events.actions';
import {updateEvents} from '../../instance/events/events.actions';
import {SettingsState} from "../../settings/settings.state";

function* fetch() {

	let doFetch = true;

	try {
		while (doFetch) {
			doFetch = yield select((state: any) => state.events.fetchEvents);

			let settings: SettingsState = yield select((state: any) => state.settings);

			let events = yield call(fetchEvents, settings.activeInstance);

			yield put(updateEvents(events.resources));

			yield call(delay, 10000);
		}
	} catch (err) {
		doFetch = yield select((state: any) => state.events.fetchEvents);

		yield call(delay, 10000);

		doFetch ? yield put(retry()) : null;
	}
}

export function* fetchEventsSaga() {
	yield* takeLatest(FETCH_EVENTS, fetch);
}
