import initialState from '../initialState';
import {
  REQUEST_LOGIN,
  LOGGED_IN,
  LOGGED_OUT,
  INVALID_LOGIN,
  TOKEN_EXPIRED,
  REFRESH_TOKEN,
  TOKEN_REFRESHED,
  REQUEST_GET_SETTINGS,
  RETRIEVED_SETTINGS
} from './settings.action-types';

export function settingsReducer(state = initialState.settings, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {...state, isLoggingIn: true, loginFailed: false, isLoggedIn: false};
    case LOGGED_IN:
      return {
        ...state,
        cfInstance: action.cfInstance,
        token: action.token,
        isLoggedIn: true,
        isLoggingIn: false,
        loginFailed: false
      };
    case LOGGED_OUT:
      return {...state, isLoggedIn: false, token: {}};
    case INVALID_LOGIN:
      return {
        ...state,
        loginFailed: true,
        isLoggedIn: false,
        isLoggingIn: false,
        isReadingSettings: false,
        isRefreshingToken: false
      };
    case TOKEN_EXPIRED:
      return {...state, isTokenExpired: true, isLoggedIn: false, isLoggingIn: false};
    case REFRESH_TOKEN:
      return {...state, isRefreshingToken: true};
    case TOKEN_REFRESHED:
      return {...state, isLoggedIn: true, isRefreshingToken: false, token: action.token};
    case REQUEST_GET_SETTINGS:
      return {...state, isReadingSettings: true};
    case RETRIEVED_SETTINGS:
      return {
        ...state,
        cfInstance: action.settings.cfInstance,
        token: action.settings.token,
        isSettingsLoaded: true,
        isReadingSettings: false,
        isRefreshingToken: true
      };
    default:
      return state;
  }
}
