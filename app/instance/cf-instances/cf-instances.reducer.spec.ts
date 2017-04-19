import * as actionTypes from './cf-instances.action-types';
import {cfInstancesReducer} from './cf-instances.reducer';
import {cfInstances, CfInstancesState, Instance} from './cf-instances.state';
import {Token} from "../../cloud/user/token.interface";

describe('CF instances reducer', () => {

	it('should fetch the instances from disk', () => {
		const action = {type: actionTypes.FETCH_CF_INSTANCES};
		const state = {...cfInstances, isLoadingCfInstances: false} as CfInstancesState;

		cfInstancesReducer(state, action).should.eql({...state, isLoadingCfInstances: true} as CfInstancesState);
	});

	it('should update the cf instances', () => {
		const action = {
			type: actionTypes.UPDATE_CF_INSTANCES,
			instances: {
				'lab.run.io1': {
					cfInstance: 'lab.run.io1',
					isLoggedIn: true,
					token: {} as Token
				},
				'lab.run.io2': {
					cfInstance: 'lab.run.io2',
					isLoggedIn: true,
					token: {} as Token
				}
			}
		};
		const state = {
			...cfInstances, instances: {
				'lab.run.io3': {
					cfInstance: 'lab.run.io3',
					isLoggedIn: true,
					token: {} as Token
				},
			}, isLoadingCfInstances: true
		} as CfInstancesState;

		cfInstancesReducer(state, action).should.eql({
			...state, instances: {
				'lab.run.io3': {
					cfInstance: 'lab.run.io3',
					isLoggedIn: true,
					token: {} as Token
				},
				'lab.run.io1': {
					cfInstance: 'lab.run.io1',
					isLoggedIn: true,
					token: {} as Token
				},
				'lab.run.io2': {
					cfInstance: 'lab.run.io2',
					isLoggedIn: true,
					token: {} as Token
				}
			}, isLoadingCfInstances: false
		} as CfInstancesState);
	});

	it('should alert the user that loading cf instances failed', () => {
		const action = {type: actionTypes.FETCH_CF_INSTANCES_FAILED};
		const state = {...cfInstances, isLoadingCfInstances: true} as CfInstancesState;

		cfInstancesReducer(state, action).should.eql({...state, isLoadingCfInstances: false} as CfInstancesState);
	});

	it('should request that a new cf instance be added', () => {
		const action = {
			type: actionTypes.REQUEST_ADD_INSTANCE,
			cfInstance: 'lab.run.io',
			username: 'user',
			password: 'pass'
		};
		const state = {...cfInstances, isAddingNewCfInstance: false} as CfInstancesState;

		cfInstancesReducer(state, action).should.eql({...state, isAddingNewCfInstance: true} as CfInstancesState);
	});

	it('should add a new cf instance to the list', () => {
		const action = {
			type: actionTypes.ADD_CF_INSTANCE,
			instance: {'lab.run.io2': {cfInstance: 'lab.run.io2', isLoggedIn: true, token: {} as Token}}
		};
		const state = {
			...cfInstances, isAddingNewCfInstance: true, instances: {
				'lab.run.io1': {
					cfInstance: 'lab.run.io1',
					isLoggedIn: true,
					token: {} as Token
				},
			}
		} as CfInstancesState;

		cfInstancesReducer(state, action).should.eql({
			...state, isAddingNewCfInstance: false, instances: {
				'lab.run.io1': {
					cfInstance: 'lab.run.io1',
					isLoggedIn: true,
					token: {} as Token
				},
				'lab.run.io2': {
					cfInstance: 'lab.run.io2',
					isLoggedIn: true,
					token: {} as Token
				}
			}
		} as CfInstancesState);
	});

	it('should alert the user that adding a cf instance failed', () => {
		const action = {type: actionTypes.ADD_CF_INSTANCE_FAILED};
		const state = {...cfInstances, isAddingNewCfInstance: true} as CfInstancesState;

		cfInstancesReducer(state, action).should.eql({...state, isAddingNewCfInstance: false} as CfInstancesState);
	});
});
