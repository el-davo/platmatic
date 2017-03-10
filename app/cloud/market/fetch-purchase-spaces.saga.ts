import {takeEvery} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {REQUEST_FETCH_PURCHASE_SPACES} from '../../instance/market/market.action-types';
import {updatePurchaseSpaces} from '../../instance/market/market.actions';
import {fetchSpacesInOrganization} from '../spaces/spaces.service';
import {fetchOrganizations} from '../organizations/organization.service';

function* fetch() {
	try {
		let settings = yield select((state: any) => state.settings);
		let purchaseSpaces = [];

		let organizations = yield call(fetchOrganizations, settings);

		yield organizations.resources.map(function*(organization) {
			let {spaces} = yield call(fetchSpacesInOrganization, settings, organization.metadata.guid);

			purchaseSpaces.push({organization, spaces});
		});

		yield put(updatePurchaseSpaces(purchaseSpaces));
	} catch (e) {
		console.log(e);
	}
}

export function* fetchPurchaseSpacesSaga() {
	yield* takeEvery(REQUEST_FETCH_PURCHASE_SPACES, fetch);
}
