import {Token} from '../cloud/user/token.interface';

export const settings = {
	isLoggedIn: false,
	isLoggingIn: false,
	isLoggingOut: false,
	isRefreshingToken: true,
	isReadingSettings: false,
	isSettingsLoaded: false,
	showAddCfInstanceModal: false,
	cfInstances: {}
} as SettingsState;

export interface SettingsState {
	isLoggedIn: boolean;
	isLoggingIn: boolean;
	isLoggingOut: boolean;
	isRefreshingToken: boolean;
	isReadingSettings: boolean;
	isSettingsLoaded: boolean;
	showAddCfInstanceModal: boolean;
	cfInstances: CfInstance
}

export interface CfInstance {
	[key: string]: Token
}
