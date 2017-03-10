import initialState from '../../initialState';
import {
  SHOW_SEARCH_OVERLAY,
  HIDE_SEARCH_OVERLAY,
  UPDATE_APP_SEARCH_RESULTS,
  UPDATE_SPACE_SEARCH_RESULTS,
  UPDATE_MARKET_SEARCH_RESULTS,
  INVALIDATE_SEARCH_CACHE,
  ADD_TO_APP_SEARCH_CACHE,
  ADD_TO_MARKET_SEARCH_CACHE
} from './search.action-types';

export function searchReducer(state = initialState.search, action) {
  switch (action.type) {
    case SHOW_SEARCH_OVERLAY:
      return {...state, showSearchOverlay: true};
    case HIDE_SEARCH_OVERLAY:
      return {...state, showSearchOverlay: false};
    case UPDATE_APP_SEARCH_RESULTS:
      return {...state, appResults: action.results};
    case UPDATE_SPACE_SEARCH_RESULTS:
      return {...state, spacesResults: action.results};
    case UPDATE_MARKET_SEARCH_RESULTS:
      return {...state, marketResults: action.results};

    // Search Cache
    case INVALIDATE_SEARCH_CACHE:
      return {...state, cache: {apps: [], spaces: [], market: []}};
    case ADD_TO_APP_SEARCH_CACHE:
      return {...state, cache: {...state.cache, apps: [...state.cache.apps, ...action.apps]}};
    case ADD_TO_MARKET_SEARCH_CACHE:
      return {...state, cache: {...state.cache, market: [...state.cache.market, ...action.market]}};
    default:
      return state;
  }
}
