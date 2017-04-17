import * as actionTypes from './settings.action-types';
import {Settings} from './settings.interface';
import {Instance} from "./settings.state";

export function requestLogin(cfInstance: string, username: string, password: string) {
	return {type: actionTypes.REQUEST_LOGIN, cfInstance, username, password};
}

export function loggedIn(instance: Instance) {
	return {type: actionTypes.LOGGED_IN, instance};
}

export function requestLogout(cfInstance: string) {
	return {type: actionTypes.REQUEST_LOGOUT, cfInstance};
}

export function loggedOut(cfInstance: string) {
	return {type: actionTypes.LOGGED_OUT, cfInstance};
}

export function invalidLogin(instance: Instance) {
	return {type: actionTypes.INVALID_LOGIN, instance};
}

export function refreshToken(instance: Instance) {
	return {type: actionTypes.REFRESH_TOKEN, instance}
}

export function tokenRefreshed(instance: Instance) {
	return {type: actionTypes.TOKEN_REFRESHED, instance};
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

export function setActiveInstance(instance: Instance) {
	return {type: actionTypes.SET_ACTIVE_INSTANCE, instance};
}
