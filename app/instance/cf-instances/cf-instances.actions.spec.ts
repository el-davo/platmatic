import * as actionTypes from './cf-instances.action-types';
import * as actions from './cf-instances.actions';
import {CfInstance, Instance} from "./cf-instances.state";
import {Token} from "../../cloud/user/token.interface";

describe('CF instances actions', () => {

	it('should fetch cf instances from disk', () => {
		actions.fetchCfInstances().should.eql({type: actionTypes.FETCH_CF_INSTANCES});
	});

	it('should update the cf instances', () => {
		const instances = {};

		actions.updateCfInstances(instances).should.eql({type: actionTypes.UPDATE_CF_INSTANCES, instances});
	});

	it('should alert the user that fetch the cf instances failed', () => {
		actions.fetchCfInstancesFailed().should.eql({type: actionTypes.FETCH_CF_INSTANCES_FAILED});
	});

	it('should request that a new cf instance be added', () => {
		const cfInstance = 'lab.run.io';
		const username = 'username';
		const password = 'password';
		actions.requestAddInstance(cfInstance, username, password).should.eql({
			type: actionTypes.REQUEST_ADD_INSTANCE,
			cfInstance,
			username,
			password
		});
	});

	it('should add a new cf instance', () => {
		const instance = {'lab.run.io': {isLoggedIn: true, cfInstance: 'lab.run.io', token: {} as Token}} as CfInstance;

		actions.addCfInstance(instance).should.eql({type: actionTypes.ADD_CF_INSTANCE, instance});
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
