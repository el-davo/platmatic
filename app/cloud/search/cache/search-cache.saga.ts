import {takeLatest, delay} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {REQUEST_SEARCH_CACHE} from '../../../instance/search/search.action-types';
import {fetchAllApps} from '../../apps/apps.service';
import {fetchServices} from '../../market/market.service';
import {
	addToAppSearchCache,
	addToMarketSearchCache,
	invalidateSearchCache,
	requestSearchCache
} from '../../../instance/search/search.actions';

function* fetch({page}) {
	try {
		let settings = yield select((state: any) => state.settings);

		let [apps, services] = [
			yield call(fetchAllApps, settings, page),
			yield call(fetchServices, settings, page)
		];

		let appsCache = [...apps.resources];
		let marketCache = [...services.resources];

		for (let i = 1; i < apps.total_pages; i++) {
			let cache = yield call(fetchAllApps, settings, i + 1);
			appsCache = [...appsCache, ...cache.resources]
		}

		for (let i = 1; i < services.total_pages; i++) {
			let cache = yield call(fetchServices, settings, i + 1);
			marketCache = [...marketCache, ...cache.resources]
		}

		yield put(invalidateSearchCache());
		yield put(addToAppSearchCache(appsCache));
		yield put(addToMarketSearchCache(marketCache));

		yield call(delay, 30000);
		yield put(requestSearchCache());
	} catch (e) {
		console.log(e);
	}
}

export function* searchCacheSaga() {
	yield* takeLatest(REQUEST_SEARCH_CACHE, fetch);
}
