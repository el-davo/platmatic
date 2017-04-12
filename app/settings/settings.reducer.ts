import * as actionTypes from './settings.action-types';
import {settings, SettingsState, CfInstance} from './settings.state';
import {omit} from 'lodash';

export interface Action {
	type: string;
	cfInstance?: any;
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
				cfInstances: {...state.cfInstances, ...action.cfInstance}
			};
		case actionTypes.REQUEST_LOGOUT:
			return {...state, isLoggingOut: true};
		case actionTypes.LOGGED_OUT:
			return {...state, isLoggingOut: false, cfInstances: omit(state.cfInstances, [action.cfInstance]) as CfInstance};
		case actionTypes.INVALID_LOGIN:
			return {...state, isLoggingIn: false};
		case actionTypes.REFRESH_TOKEN:
			return {...state, isRefreshingToken: true};
		case actionTypes.TOKEN_REFRESHED:
			return {...state, isRefreshingToken: false, cfInstances: {...state.cfInstances, ...action.cfInstance}};
		case actionTypes.REQUEST_GET_SETTINGS:
			return {...state, isReadingSettings: true};
		case actionTypes.RETRIEVED_SETTINGS:
			return {...state, isReadingSettings: false, cfInstances: action.settings};
		case actionTypes.OPEN_ADD_CF_INSTANCE_DIALOG:
			return {...state, showAddCfInstanceModal: true};
		case actionTypes.CLOSE_ADD_CF_INSTANCE_DIALOG:
			return {...state, showAddCfInstanceModal: false};
		default:
			return state;
	}
}
