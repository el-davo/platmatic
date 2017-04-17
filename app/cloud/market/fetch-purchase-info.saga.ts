import {takeEvery, delay} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {REQUEST_FETCH_PURCHASE_PLANS} from '../../instance/market/market.action-types';
import {
	requestFetchPurchasePlans,
	addPurchasePlans,
	requestPurchasePlansFailed
} from '../../instance/market/market.actions';
import {fetchServicePurchaseInfo} from './market.service';
import {SettingsState} from "../../settings/settings.state";

function* fetch({page, service}) {
	try {
		let settings: SettingsState = yield select((state: any) => state.settings);
		let {purchasePlans} = yield select((state: any) => state.market);

		let plans = yield call(fetchServicePurchaseInfo, settings.activeInstance, page, service);

		yield put(addPurchasePlans(plans.resources));

		yield call(delay, 100);

		purchasePlans.page < plans.total_pages ? yield put(requestFetchPurchasePlans(purchasePlans.page + 1, service)) : null;
	} catch (e) {
		yield put(requestPurchasePlansFailed());
	}
}

export function* fetchPurchaseInfoSaga() {
	yield* takeEvery(REQUEST_FETCH_PURCHASE_PLANS, fetch);
}
