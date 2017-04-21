import * as actionTypes from './cf-instances.action-types';
import * as actions from './cf-instances.actions';
import {CfInstances, Instance} from "./cf-instances.state";
import {Token} from "../../cloud/user/token.interface";

describe('CF instances actions', () => {

	it('should fetch cf instances from disk', () => {
		actions.fetchCfInstances().should.eql({type: actionTypes.FETCH_CF_INSTANCES});
	});

	it('should update the cf instances', () => {
		const cfInstances = {};

		actions.updateCfInstances(cfInstances).should.eql({type: actionTypes.UPDATE_CF_INSTANCES, cfInstances});
	});

	it('should alert the user that fetch the cf instances failed', () => {
		actions.fetchCfInstancesFailed().should.eql({type: actionTypes.FETCH_CF_INSTANCES_FAILED});
	});

	it('should request that a new cf instance be added', () => {
		const cfInstanceUrl = 'lab.run.io';
		const username = 'username';
		const password = 'password';
		actions.requestAddInstance(cfInstanceUrl, username, password).should.eql({
			type: actionTypes.REQUEST_ADD_INSTANCE,
			cfInstanceUrl,
			username,
			password
		});
	});

	it('should add a new cf instance', () => {
		const cfInstance = {'lab.run.io': {isLoggedIn: true, cfInstance: 'lab.run.io', token: {} as Token}} as CfInstances;

		actions.addCfInstance(cfInstance).should.eql({type: actionTypes.ADD_CF_INSTANCE, cfInstance});
	});

	it('should alert the user that adding a new cf instance failed', () => {
		actions.addCfInstanceFailed().should.eql({type: actionTypes.ADD_CF_INSTANCE_FAILED});
	});

	it('should request that a cf instance be deleted', () => {
		const instance = {isLoggedIn: true, cfInstance: 'lab.run.io', token: {} as Token} as Instance;

		actions.requestDeleteCfInstance(instance).should.eql({type: actionTypes.REQUEST_DELETE_CF_INSTANCE, instance});
	});

	it('should delete a cf instance', () => {
		const instance = {} as Instance;
		actions.deleteCfInstance(instance).should.eql({type: actionTypes.DELETE_CF_INSTANCE, instance});
	});

	it('should alert the user that deleting the cf instance failed', () => {
		actions.deleteCfInstanceFailed().should.eql({type: actionTypes.DELETE_CF_INSTANCE_FAILED});
	});
});
