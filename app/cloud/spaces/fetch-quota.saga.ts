import {takeEvery} from 'redux-saga';
import {call, take, put, select} from 'redux-saga/effects';
import {FETCH_QUOTA} from '../../instance/spaces/quota/quota.action-types';
import {fetchQuotas} from './quota.service';

function* fetch() {
	let settings = yield select((state: any) => state.settings);
	let organizationId = yield select((state: any) => state.organization.result);

	const channel = yield call(fetchQuotas, settings, organizationId);

	try {
		while (true) {
			let action = yield take(channel);
			yield put(action);
		}
	} catch (e) {
		console.log(e);
	}
}

export function* fetchQuotasSaga() {
	yield* takeEvery(FETCH_QUOTA, fetch);
}
