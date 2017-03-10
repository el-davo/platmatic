import {
  UPDATE_APPS,
  FETCH_APPS,
  CLEAR_APPS,
  NEXT_PAGE,
  PREV_PAGE,
  GO_TO_PAGE,
  START_APP,
  STOP_APP,
  REQUEST_DELETE_APP,
  APP_DELETED
} from './apps.action-types';

export function updateApps(result) {
  return {type: UPDATE_APPS, result};
}

export function fetchApps(guid) {
  return {type: FETCH_APPS, guid}
}

export function clearApps() {
  return {type: CLEAR_APPS};
}

export function nextPage() {
  return {type: NEXT_PAGE};
}

export function prevPage() {
  return {type: PREV_PAGE};
}

export function goToPage(page) {
  return {type: GO_TO_PAGE, page};
}

export function startApp(guid) {
  return {type: START_APP, guid};
}

export function stopApp(guid) {
  return {type: STOP_APP, guid};
}

// Delete App
export function requestDeleteApp(app) {
  return {type: REQUEST_DELETE_APP, app};
}

export function appDeleted(app) {
  return {type: APP_DELETED, app};
}
