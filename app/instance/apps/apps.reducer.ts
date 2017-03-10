import initialState from '../../initialState';
import {
  FETCH_APPS,
  UPDATE_APPS,
  CLEAR_APPS,
  UPDATE_RESULTS_PER_PAGE,
  NEXT_PAGE,
  PREV_PAGE,
  GO_TO_PAGE
} from './apps.action-types';

export function appsReducer(state = initialState.apps, action) {
  switch (action.type) {
    case FETCH_APPS:
      return { ...state, isFetchingApps: true };
    case UPDATE_APPS:
      return { ...state, result: action.result, isFetchingApps: false };
    case CLEAR_APPS:
      return { ...state, result: { resources: [] }, page: 1 };
    case UPDATE_RESULTS_PER_PAGE:
      return { ...state, resultsPerPage: action.resultsPerPage };
    case NEXT_PAGE:
      return { ...state, result: { ...state.result, resources: [] }, page: state.page + 1 };
    case PREV_PAGE:
      return { ...state, result: { ...state.result, resources: [] }, page: state.page - 1 };
    case GO_TO_PAGE:
      return { ...state, result: { ...state.result, resources: [] }, page: action.page };
    default:
      return state;
  }
}
