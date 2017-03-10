import initialState from '../../initialState';
import {
  REQUEST_LOGIN_SSH,
  LOGGED_IN_SSH,
  LOGIN_SSH_FAILED,
  REQUEST_CHANGE_INSTANCE,
  REQUEST_LOGOUT_SSH,
  LOGGED_OUT_SSH,
  SEND_COMMAND
} from './ssh.action-types';

export function sshReducer(state = initialState.ssh, action) {
  switch (action.type) {
    case REQUEST_LOGIN_SSH:
      return {...state, isConnectingToSSH: true, loginFailed: false, app: action.app};
    case LOGGED_IN_SSH:
      return {...state, isConnectingToSSH: false, isLoggedIn: true};
    case LOGIN_SSH_FAILED:
      return {...state, loginFailed: true, isConnectingToSSH: false};
    case REQUEST_CHANGE_INSTANCE:
      return {...state, isConnectingToSSH: true, appInstance: action.appInstance};
    case REQUEST_LOGOUT_SSH:
      return {...state, isLoggingOut: true};
    case LOGGED_OUT_SSH:
      return {...state, isLoggingOut: false, isLoggedIn: false, appGuid: null, appInstance: 0};
    case SEND_COMMAND:
      return {...state, isSendingCommand: true};
    default:
      return state;
  }
}
