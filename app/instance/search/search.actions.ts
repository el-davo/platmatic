import {
  SHOW_SEARCH_OVERLAY,
  HIDE_SEARCH_OVERLAY,
  REQUEST_SEARCH,
  UPDATE_APP_SEARCH_RESULTS,
  UPDATE_SPACE_SEARCH_RESULTS,
  UPDATE_MARKET_SEARCH_RESULTS,
  INVALIDATE_SEARCH_CACHE,
  REQUEST_SEARCH_CACHE,
  ADD_TO_APP_SEARCH_CACHE,
  ADD_TO_MARKET_SEARCH_CACHE
} from './search.action-types';

export function showSearchOverlay() {
  return {type: SHOW_SEARCH_OVERLAY};
}

export function hideSearchOverlay() {
  return {type: HIDE_SEARCH_OVERLAY};
}

export function requestSearch(searchTerm) {
  return {type: REQUEST_SEARCH, searchTerm};
}

export function updateAppSearchResults(results) {
  return {type: UPDATE_APP_SEARCH_RESULTS, results};
}

export function updateSpaceSearchResults(results) {
  return {type: UPDATE_SPACE_SEARCH_RESULTS, results};
}

export function updateMarketSearchResults(results) {
  return {type: UPDATE_MARKET_SEARCH_RESULTS, results};
}

// Search Cache
export function invalidateSearchCache() {
  return {type: INVALIDATE_SEARCH_CACHE};
}

export function requestSearchCache(page = 1) {
  return {type: REQUEST_SEARCH_CACHE, page};
}

export function addToAppSearchCache(apps) {
  return {type: ADD_TO_APP_SEARCH_CACHE, apps}
}

export function addToMarketSearchCache(market) {
  return {type: ADD_TO_MARKET_SEARCH_CACHE, market};
}

