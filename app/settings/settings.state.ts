import {Token} from '../cloud/user/token.interface';

export const settings = {
	isLoggingIn: false,
	isLoggingOut: false,
	isRefreshingToken: true,
	isReadingSettings: false,
	isSettingsLoaded: false,
	showAddCfInstanceModal: false,
	activeInstance: {},
	cfInstances: {}
} as SettingsState;

export interface SettingsState {
	isLoggingIn: boolean;
	isLoggingOut: boolean;
	isRefreshingToken: boolean;
	isReadingSettings: boolean;
	isSettingsLoaded: boolean;
	showAddCfInstanceModal: boolean;
	activeInstance: Instance,
	cfInstances: CfInstance
}

export interface CfInstance {
	[key: string]: Instance
}

export interface Instance {
	isLoggedIn: boolean;
	token: Token;
	primary: boolean;
	cfInstance: string;
}
