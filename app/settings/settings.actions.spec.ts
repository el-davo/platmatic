import * as actionTypes from './settings.action-types';
import * as actions from './settings.actions';
import {Token} from '../cloud/user/token.interface';
import {Settings} from './settings.interface';
import {CfInstance} from "./settings.state";

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
		const cfInstance = {'lab.run.io': {access_token: 'abc123'} as Token} as CfInstance;
		actions.loggedIn(cfInstance).should.eql({type: actionTypes.LOGGED_IN, cfInstance});
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
		actions.invalidLogin().should.eql({type: actionTypes.INVALID_LOGIN});
	});

	it('should refresh the token for a cf instance', () => {
		const cfInstance = 'run.lab.io';
		actions.refreshToken(cfInstance).should.eql({type: actionTypes.REFRESH_TOKEN, cfInstance});
	});

	it('should alert the user that the token has been refreshed for a cf instance', () => {
		const cfInstance = {'lab.run.io': {access_token: 'abc123'} as Token} as CfInstance;
		actions.tokenRefreshed(cfInstance).should.eql({type: actionTypes.TOKEN_REFRESHED, cfInstance});
	});

	it('should load the settings from disk', () => {
		actions.requestGetSettings().should.eql({type: actionTypes.REQUEST_GET_SETTINGS});
	});

	it('should alert the user that the settings have been retrieved', () => {
		const settings = {cfInstances: {'lab.run.io': {access_token: 'abc123'} as Token}} as Settings;
		actions.retrievedSettings(settings).should.eql({type: actionTypes.RETRIEVED_SETTINGS, settings});
	});

	it('should open the add cf instance dialog', () => {
		actions.openAddCfInstanceDialog().should.eql({type: actionTypes.OPEN_ADD_CF_INSTANCE_DIALOG});
	});

	it('should close the add cf instance dialog', () => {
		actions.closeCfInstanceDialog().should.eql({type: actionTypes.CLOSE_ADD_CF_INSTANCE_DIALOG});
	});

});
