import {
  REQUEST_LOGIN_SSH,
  LOGGED_IN_SSH,
  LOGIN_SSH_FAILED,
  REQUEST_CHANGE_INSTANCE,
  CHANGE_INSTANCE_FAILED,
  REQUEST_LOGOUT_SSH,
  LOGGED_OUT_SSH,
  SEND_COMMAND,
  REGISTER_CALLBACK_LISTENER,
  RESPOND_TO_COMMAND
} from './ssh.action-types';

export function requestLoginSSH(app, appInstance) {
  return {type: REQUEST_LOGIN_SSH, app, appInstance};
}

export function loggedInSSH() {
  return {type: LOGGED_IN_SSH};
}

export function loginSSHFailed(err) {
  return {type: LOGIN_SSH_FAILED, err};
}

export function requestLogoutSSH() {
  return {type: REQUEST_LOGOUT_SSH};
}

export function requestChangeInstance(appInstance) {
  return {type: REQUEST_CHANGE_INSTANCE, appInstance}
}

export function changeInstanceFailed() {
  return {type: CHANGE_INSTANCE_FAILED};
}

export function loggedOutSSH() {
  return {type: LOGGED_OUT_SSH};
}

export function sendCommand(command) {
  return {type: SEND_COMMAND, command}
}

export function registerCallbackListener(callback) {
  return {type: REGISTER_CALLBACK_LISTENER, callback};
}

export function respondToCommand(response) {
  return {type: RESPOND_TO_COMMAND, response};
}
