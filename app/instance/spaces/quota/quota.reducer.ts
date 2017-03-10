import initialState from '../../../initialState';
import {FETCH_QUOTA, UPDATE_QUOTA} from './quota.action-types';

export function quotaReducer(state = initialState.quota, action) {
  switch (action.type) {
    case FETCH_QUOTA:
      return {...state, isFetchingQuota: true};
    case UPDATE_QUOTA:
      return {...state, result: action.quota, isFetchingQuota: false};
    default:
      return state;
  }
}
