import {takeEvery} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {FETCH_ORGANIZATIONS} from '../../instance/organizations/organizations.action-types';
import {fetchOrganizations} from './organization.service';
import {updateOrganizations} from '../../instance/organizations/organizations.actions';

function* fetch() {
	try {
		let settings = yield select((state: any) => state.settings);

		let {resources} = yield call(fetchOrganizations, settings);

		yield put(updateOrganizations(resources));
	} catch (e) {
		console.log(e);
	}
}

export function* fetchOrganizationsSaga() {
	yield* takeEvery(FETCH_ORGANIZATIONS, fetch);
}
