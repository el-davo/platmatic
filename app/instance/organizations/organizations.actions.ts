import {
  FETCH_ORGANIZATIONS,
  UPDATE_ORGANIZATIONS,
  CLEAR_ORGANIZATIONS,
  FETCH_ORGANIZATION_SUMMARY,
  UPDATE_ORGANIZATION_SUMMARY
} from './organizations.action-types';

export function fetchOrganizations() {
  return {type: FETCH_ORGANIZATIONS};
}

export function updateOrganizations(organizations) {
  return {type: UPDATE_ORGANIZATIONS, organizations};
}

export function clearOrganizations() {
  return {type: CLEAR_ORGANIZATIONS};
}

export function fetchOrganizationSummary(organization_guid) {
  return {type: FETCH_ORGANIZATION_SUMMARY, organization_guid};
}

export function updateOrganizationSummary(summary) {
  return {type: UPDATE_ORGANIZATION_SUMMARY, summary}
}
