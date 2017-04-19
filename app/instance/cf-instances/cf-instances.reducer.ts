import * as actionTypes from './cf-instances.action-types';
import {cfInstances, CfInstancesState, CfInstance} from './cf-instances.state';

interface Action {
	type: string;
	instances?: CfInstance,
	instance?: CfInstance
}

export function cfInstancesReducer(state: CfInstancesState = cfInstances, action: Action): CfInstancesState {
	switch (action.type) {
		case actionTypes.FETCH_CF_INSTANCES:
			return {...state, isLoadingCfInstances: true};
		case actionTypes.UPDATE_CF_INSTANCES:
			return {...state, isLoadingCfInstances: false, instances: {...state.instances, ...action.instances}};
		case actionTypes.FETCH_CF_INSTANCES_FAILED:
			return {...state, isLoadingCfInstances: false};
		case actionTypes.REQUEST_ADD_INSTANCE:
			return {...state, isAddingNewCfInstance: true};
		case actionTypes.ADD_CF_INSTANCE:
			return {...state, isAddingNewCfInstance: false, instances: {...state.instances, ...action.instance}};
		case actionTypes.ADD_CF_INSTANCE_FAILED:
			return {...state, isAddingNewCfInstance: false};
		default:
			return state;
	}
}
