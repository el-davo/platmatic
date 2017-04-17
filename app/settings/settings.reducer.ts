import * as actionTypes from './settings.action-types';
import {settings, SettingsState, CfInstance, Instance} from './settings.state';
import {omit} from 'lodash';

export interface Action {
	type: string;
	instance?: Instance;
	cfInstance?: string,
	username?: string;
	password?: string;
	settings: CfInstance
}

export function settingsReducer(state: SettingsState = settings, action: Action): SettingsState {
	switch (action.type) {
		case actionTypes.REQUEST_LOGIN:
			return {...state, isLoggingIn: true};
		case actionTypes.LOGGED_IN:
			return {
				...state,
				isLoggedIn: true,
				isLoggingIn: false,
				activeInstance: action.instance,
				cfInstances: {...state.cfInstances, [action.instance.cfInstance]: {...action.instance, isLoggedIn: true}}
			};
		case actionTypes.REQUEST_LOGOUT:
			return {...state, isLoggingOut: true};
		case actionTypes.LOGGED_OUT:
			return {
				...state,
				isLoggingOut: false,
				cfInstances: omit(state.cfInstances, [action.cfInstance]) as CfInstance
			};
		case actionTypes.INVALID_LOGIN:
			return {
				...state,
				cfInstances: {...state.cfInstances, [action.instance.cfInstance]: {...action.instance, isLoggedIn: false}}
			};
		case actionTypes.REFRESH_TOKEN:
			return {...state, isRefreshingToken: true};
		case actionTypes.TOKEN_REFRESHED:
			return {
				...state,
				isRefreshingToken: false,
				cfInstances: {...state.cfInstances, [action.instance.cfInstance]: action.instance}
			};
		case actionTypes.REQUEST_GET_SETTINGS:
			return {...state, isReadingSettings: true};
		case actionTypes.RETRIEVED_SETTINGS:
			return {...state, isReadingSettings: false, cfInstances: action.settings};
		case actionTypes.OPEN_ADD_CF_INSTANCE_DIALOG:
			return {...state, showAddCfInstanceModal: true};
		case actionTypes.CLOSE_ADD_CF_INSTANCE_DIALOG:
			return {...state, showAddCfInstanceModal: false};
		case actionTypes.SET_ACTIVE_INSTANCE:
			return {...state, activeInstance: {...action.instance, isLoggedIn: true}};
		default:
			return state;
	}
}
