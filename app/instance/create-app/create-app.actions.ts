import {
  SELECT_TARGET_DIRECTORY,
  SHOW_CREATE_APP_DIALOG,
  HIDE_CREATE_APP_DIALOG,
  REQUEST_CREATE_APP,
  APP_INITIALIZATION_SUCCESS,
  APP_INITIALIZATION_FAILED,

  // Create App Form
  REQUEST_POPULATE_CREATE_APP_FORM,
  POPULATE_FORM_SPACES,
  POPULATE_FORM_STACKS,
  POPULATE_FORM_BUILDPACKS,
  POPULATE_FORM_DOMAINS,
  POPULATE_FORM_SUCCESS,
  POPULATE_FORM_FAILED
} from './create-app.action-types';

export function selectTargetDirectory() {
  return {type: SELECT_TARGET_DIRECTORY};
}

export function showCreateAppDialog(targetDirectory) {
  return {type: SHOW_CREATE_APP_DIALOG, targetDirectory};
}

export function hideCreateAppDialog() {
  return {type: HIDE_CREATE_APP_DIALOG};
}

export function requestCreateApp(appId, app) {
  return {type: REQUEST_CREATE_APP, appId, app};
}

export function appInitializationSuccess(appId, app) {
  return {type: APP_INITIALIZATION_SUCCESS, appId, app};
}

export function appInitializationFailed(appId, app) {
  return {type: APP_INITIALIZATION_FAILED, appId, app};
}

// Create App Form
export function requestPopulateCreateAppForm() {
  return {type: REQUEST_POPULATE_CREATE_APP_FORM};
}

export function populateFormSpaces(spaces) {
  return {type: POPULATE_FORM_SPACES, spaces};
}

export function populateFormStacks(stacks) {
  return {type: POPULATE_FORM_STACKS, stacks};
}

export function populateFormBuildpacks(buildpacks) {
  return {type: POPULATE_FORM_BUILDPACKS, buildpacks};
}

export function populateFormDomains(domains) {
  return {type: POPULATE_FORM_DOMAINS, domains};
}

export function populateFormSuccess() {
  return {type: POPULATE_FORM_SUCCESS};
}

export function populateFormFailed() {
  return {type: POPULATE_FORM_FAILED};
}
