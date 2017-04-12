import * as actionTypes from './settings.action-types';
import {Token} from '../cloud/user/token.interface';
import {Settings, CfInstance} from './settings.interface';

export function requestLogin(cfInstance: string, username: string, password: string) {
	return {type: actionTypes.REQUEST_LOGIN, cfInstance, username, password};
}

export function loggedIn(cfInstance: string, token: Token) {
	return {type: actionTypes.LOGGED_IN, cfInstance, token};
}

export function requestLogout(cfInstance: string) {
	return {type: actionTypes.REQUEST_LOGOUT, cfInstance};
}

export function loggedOut(cfInstance: string) {
	return {type: actionTypes.LOGGED_OUT, cfInstance};
}

export function invalidLogin() {
	return {type: actionTypes.INVALID_LOGIN};
}

export function refreshToken(cfInstance: string) {
	return {type: actionTypes.REFRESH_TOKEN, cfInstance}
}

export function tokenRefreshed(cfInstance: string, token: Token) {
	return {type: actionTypes.TOKEN_REFRESHED, cfInstance, token};
}

export function requestGetSettings() {
	return {type: actionTypes.REQUEST_GET_SETTINGS};
}

export function retrievedSettings(settings: Settings) {
	return {type: actionTypes.RETRIEVED_SETTINGS, settings};
}

export function openAddCfInstanceDialog() {
	return {type: actionTypes.OPEN_ADD_CF_INSTANCE_DIALOG};
}

export function closeCfInstanceDialog() {
	return {type: actionTypes.CLOSE_ADD_CF_INSTANCE_DIALOG};
}

export function addCfInstance(cfInstance: string, username: string, password: string) {
	return {type: actionTypes.ADD_CF_INSTANCE, cfInstance, username, password};
}

export function addCfInstanceSuccess(cfInstance: CfInstance) {
	return {type: actionTypes.ADD_CF_INSTANCE_SUCCESS, cfInstance};
}

export function addCfInstanceFailed() {
	return {type: actionTypes.ADD_CF_INSTANCE_FAILED};
}
