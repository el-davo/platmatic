import {
  REQUEST_LOGIN,
  LOGGED_IN,
  REQUEST_LOGOUT,
  LOGGED_OUT,
  INVALID_LOGIN,
  TOKEN_EXPIRED,
  REFRESH_TOKEN,
  TOKEN_REFRESHED,
  REQUEST_GET_SETTINGS,
  RETRIEVED_SETTINGS
} from './settings.action-types';

export function requestLogin(cfInstance, username, password) {
  return {type: REQUEST_LOGIN, cfInstance, username, password};
}

export function loggedIn(cfInstance, token) {
  return {type: LOGGED_IN, cfInstance, token};
}

export function requestLogout() {
  return {type: REQUEST_LOGOUT};
}

export function loggedOut() {
  return {type: LOGGED_OUT};
}

export function invalidLogin() {
  return {type: INVALID_LOGIN};
}

export function tokenExpired() {
  return {type: TOKEN_EXPIRED};
}

export function refreshToken() {
  return {type: REFRESH_TOKEN}
}

export function tokenRefreshed(token) {
  return {type: TOKEN_REFRESHED, token};
}

export function requestGetSettings() {
  return {type: REQUEST_GET_SETTINGS};
}

export function retrievedSettings(settings) {
  return {type: RETRIEVED_SETTINGS, settings};
}
