import * as actionTypes from './settings.action-types';
import {settings, SettingsState, CfInstance, Instance} from './settings.state';
import {settingsReducer, Action} from './settings.reducer';
import {Token} from "../cloud/user/token.interface";

describe('Settings Reducer', () => {

	it('should request that a user be logged in', () => {
		const action = {
			type: actionTypes.REQUEST_LOGIN,
			cfInstance: 'lab.run.io',
			username: 'testUsername',
			password: 'testPassword'
		} as Action;
		const state = {...settings, isLoggingIn: false} as SettingsState;

		settingsReducer(state, action).should.eql({...state, isLoggingIn: true} as SettingsState);
	});

	it('should alert the user that the login attempt was a success', () => {
		const action = {
			type: actionTypes.LOGGED_IN,
			cfInstance: {'lab.run.io': {token: {access_token: '123abc'} as Token} as Instance} as CfInstance
		} as Action;
		const state = {
			...settings,
			isLoggingIn: true,
			isLoggedIn: false,
			cfInstances: {'lab.run.io1': {token: {access_token: 'abc123'} as Token} as Instance}
		} as SettingsState;

		settingsReducer(state, action).should.eql({
			...state,
			isLoggingIn: false,
			isLoggedIn: true,
			cfInstances: {
				'lab.run.io1': {token: {access_token: 'abc123'} as Token} as Instance,
				'lab.run.io': {token: {access_token: '123abc'} as Token} as Instance
			}
		} as SettingsState);
	});

	it('should request logout for the user', () => {
		const action = {type: actionTypes.REQUEST_LOGOUT, cfInstance: 'lab.run.io'} as Action;
		const state = {...settings, isLoggingOut: false} as SettingsState;

		settingsReducer(state, action).should.eql({...state, isLoggingOut: true} as SettingsState);
	});

	it('should alert the user that they have been logged out', () => {
		const action = {type: actionTypes.LOGGED_OUT, cfInstance: 'lab.run.io'} as Action;
		const state = {
			...settings,
			isLoggingOut: true,
			cfInstances: {
				'lab.run.io1': {token: {access_token: 'abc123'} as Token} as Instance,
				'lab.run.io': {token: {access_token: '123abc'} as Token} as Instance
			}
		} as SettingsState;

		settingsReducer(state, action).should.eql({
			...state,
			isLoggingOut: false,
			cfInstances: {'lab.run.io1': {token: {access_token: 'abc123'} as Token} as Instance}
		} as SettingsState);
	});

	it('should alert the user that the login attempt was invalid', () => {
		const action = {type: actionTypes.INVALID_LOGIN} as Action;
		const state = {...settings, isLoggingIn: true} as SettingsState;

		settingsReducer(state, action).should.eql({...state, isLoggingIn: false} as SettingsState);
	});

	it('should attempt to refresh an expired login token', () => {
		const action = {type: actionTypes.REFRESH_TOKEN, cfInstance: 'lab.run.io'} as Action;
		const state = {...settings, isRefreshingToken: false} as SettingsState;

		settingsReducer(state, action).should.eql({...state, isRefreshingToken: true} as SettingsState);
	});

	it('should update the expired token with the new shiny token', () => {
		const action = {
			type: actionTypes.TOKEN_REFRESHED,
			cfInstance: {'lab.run.io': {token: {access_token: 'newToken'} as Token} as Instance}
		} as Action;
		const state = {
			...settings,
			isRefreshingToken: true,
			cfInstances: {
				'lab.run.io1': {token: {access_token: 'abc123'} as Token} as Instance,
				'lab.run.io': {token: {access_token: '123abc'} as Token} as Instance
			}
		} as SettingsState;

		settingsReducer(state, action).should.eql({
			...state,
			isRefreshingToken: false,
			cfInstances: {
				'lab.run.io1': {token: {access_token: 'abc123'} as Token} as Instance,
				'lab.run.io': {token: {access_token: 'newToken'} as Token} as Instance
			}
		} as SettingsState);
	});

	it('should attempt to load the settings from disk', () => {
		const action = {type: actionTypes.REQUEST_GET_SETTINGS} as Action;
		const state = {...settings, isReadingSettings: false} as SettingsState;

		settingsReducer(state, action).should.eql({...state, isReadingSettings: true} as SettingsState);
	});

	it('should update the settings retrieved from disk', () => {
		const action = {
			type: actionTypes.RETRIEVED_SETTINGS,
			settings: {
				'lab.run.io1': {token: {access_token: 'abc123'} as Token} as Instance,
				'lab.run.io': {token: {access_token: '123abc'} as Token} as Instance
			}
		} as Action;
		const state = {...settings, isReadingSettings: true} as SettingsState;

		settingsReducer(state, action).should.eql({
			...state,
			isReadingSettings: false,
			cfInstances: {
				'lab.run.io1': {token: {access_token: 'abc123'} as Token} as Instance,
				'lab.run.io': {token: {access_token: '123abc'} as Token} as Instance
			}
		} as SettingsState);
	});

	it('should open the add cf instance dialog', () => {
		const action = {type: actionTypes.OPEN_ADD_CF_INSTANCE_DIALOG} as Action;
		const state = {...settings, showAddCfInstanceModal: false} as SettingsState;

		settingsReducer(state, action).should.eql({...state, showAddCfInstanceModal: true} as SettingsState);
	});

	it('should close the add cf instance dialog', () => {
		const action = {type: actionTypes.CLOSE_ADD_CF_INSTANCE_DIALOG} as Action;
		const state = {...settings, showAddCfInstanceModal: true} as SettingsState;

		settingsReducer(state, action).should.eql({...state, showAddCfInstanceModal: false} as SettingsState);
	});
});
