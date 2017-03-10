import {FETCH_SPACES, FETCH_SPACE_SUMMARY, UPDATE_SPACES, CLEAR_SPACES} from './spaces.action-types';

export function fetchSpaces(organization_guid) {
  return {type: FETCH_SPACES, organization_guid}
}

export function fetchSpaceSummary(settings, space) {
  return {type: FETCH_SPACE_SUMMARY, settings, space}
}

export function updateSpaces(spaces) {
  return {type: UPDATE_SPACES, spaces}
}

export function clearSpaces() {
  return {type: CLEAR_SPACES};
}
