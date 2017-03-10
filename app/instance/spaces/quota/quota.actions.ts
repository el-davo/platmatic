import {FETCH_QUOTA, UPDATE_QUOTA} from './quota.action-types';

export function fetchQuota() {
  return {type: FETCH_QUOTA};
}

export function updateQuota(quota) {
  return {type: UPDATE_QUOTA, quota};
}
