import * as actionTypes from './settings.action-types';
import * as actions from './settings.actions';
import {Token} from '../cloud/user/token.interface';
import {Settings} from './settings.interface';
import {CfInstance, Instance} from "./settings.state";

describe('Settings actions', () => {

	it('should request that the user be logged in', () => {
		const cfInstance = 'run.lab.io';
		const username = 'testUsername';
		const password = 'testPassword';
		actions.requestLogin(cfInstance, username, password).should.eql({
			type: actionTypes.REQUEST_LOGIN,
			cfInstance,
			username,
			password
		})
	});

	it('should let the user know they logged in successfully', () => {
		const instance = {token: {access_token: 'abc123'} as Token} as Instance;
		actions.loggedIn(instance).should.eql({type: actionTypes.LOGGED_IN, instance});
	});

	it('should request that the user be logged out of a cf instance', () => {
		const cfInstance = 'run.lab.io';
		actions.requestLogout(cfInstance).should.eql({type: actionTypes.REQUEST_LOGOUT, cfInstance});
	});

	it('should alert the user that they have been logged out of a cf instance', () => {
		const cfInstance = 'run.lab.io';
		actions.loggedOut(cfInstance).should.eql({type: actionTypes.LOGGED_OUT, cfInstance});
	});

	it('should alert the user that the login attempt failed', () => {
		const instance = {token: {access_token: 'abc123'} as Token} as Instance;
		actions.invalidLogin(instance).should.eql({type: actionTypes.INVALID_LOGIN, instance});
	});

	it('should refresh the token for a cf instance', () => {
		const instance = {token: {access_token: 'abc123'} as Token} as Instance;
		actions.refreshToken(instance).should.eql({type: actionTypes.REFRESH_TOKEN, instance});
	});

	it('should alert the user that the token has been refreshed for a cf instance', () => {
		const instance = {token: {access_token: 'abc123'} as Token} as Instance;
		actions.tokenRefreshed(instance).should.eql({type: actionTypes.TOKEN_REFRESHED, instance});
	});

	it('should load the settings from disk', () => {
		actions.requestGetSettings().should.eql({type: actionTypes.REQUEST_GET_SETTINGS});
	});

	it('should alert the user that the settings have been retrieved', () => {
		const settings = {cfInstances: {'lab.run.io': {token: {} as Token} as Instance}} as Settings;
		actions.retrievedSettings(settings).should.eql({type: actionTypes.RETRIEVED_SETTINGS, settings});
	});

	it('should open the add cf instance dialog', () => {
		actions.openAddCfInstanceDialog().should.eql({type: actionTypes.OPEN_ADD_CF_INSTANCE_DIALOG});
	});

	it('should close the add cf instance dialog', () => {
		actions.closeCfInstanceDialog().should.eql({type: actionTypes.CLOSE_ADD_CF_INSTANCE_DIALOG});
	});

	it('should set the active cloud foundry instance', () => {
		const instance = {token: {access_token: 'abc123'} as Token} as Instance;
		actions.setActiveInstance(instance).should.eql({type: actionTypes.SET_ACTIVE_INSTANCE, instance});
	});

});
