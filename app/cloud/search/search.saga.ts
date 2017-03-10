import {takeLatest, delay} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {REQUEST_SEARCH} from '../../instance/search/search.action-types';
import {searchApps, searchMarket} from './search.service';
import {updateAppSearchResults, updateMarketSearchResults} from '../../instance/search/search.actions';

function* fetch({searchTerm}) {
  try {
    let appsCache = yield select((state: any) => state.search.cache.apps);
    let marketCache = yield select((state: any) => state.search.cache.market);

    yield call(delay, 100);

    let [apps, market] = yield [
      call(searchApps, appsCache, searchTerm),
      call(searchMarket, marketCache, searchTerm)
    ];

    yield put(updateAppSearchResults(apps));
    yield put(updateMarketSearchResults(market));

  } catch (err) {
    console.log(err);
  }
}

export function* searchSaga() {
  yield* takeLatest(REQUEST_SEARCH, fetch);
}
