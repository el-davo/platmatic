import initialState from '../../initialState';
import {
  FETCH_ORGANIZATIONS,
  UPDATE_ORGANIZATIONS,
  CLEAR_ORGANIZATIONS,
  FETCH_ORGANIZATION_SUMMARY,
  UPDATE_ORGANIZATION_SUMMARY
} from './organizations.action-types';

export function organizationsReducer(state = initialState.organizations, action) {
  switch (action.type) {
    case FETCH_ORGANIZATIONS:
      return {...state, isFetchingOrganizations: true};
    case UPDATE_ORGANIZATIONS:
      return {...state, results: action.organizations, isFetchingOrganizations: false};
    case CLEAR_ORGANIZATIONS:
      return {...state, results: []};
    case FETCH_ORGANIZATION_SUMMARY:
      return {...state, isFetchingOrganizationSummary: true};
    case UPDATE_ORGANIZATION_SUMMARY:
      return {
        ...state,
        summary: {...state.summary, [action.summary.guid]: action.summary},
        isFetchingOrganizationSummary: false
      };
    default:
      return state;
  }
}
