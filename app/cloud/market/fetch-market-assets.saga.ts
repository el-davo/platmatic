import {takeEvery, delay} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {FETCH_MARKET_ASSETS} from '../../instance/market/market.action-types';
import {addMarketAssets, fetchMarketAssets} from '../../instance/market/market.actions';
import {fetchServices} from './market.service';
import {SettingsState} from "../../settings/settings.state";

function* fetch() {
	try {
		let settings: SettingsState = yield select((state: any) => state.settings);
		let market = yield select((state: any) => state.market);

		let assets = yield call(fetchServices, settings.activeInstance, market.page, 25);

		yield put(addMarketAssets(assets));

		yield call(delay, 100);

		market.page < assets.total_pages ? yield put(fetchMarketAssets(market.page + 1)) : null;
	} catch (e) {
		console.log(e);
	}
}

export function* fetchMarketAssetsSaga() {
	yield* takeEvery(FETCH_MARKET_ASSETS, fetch);
}
