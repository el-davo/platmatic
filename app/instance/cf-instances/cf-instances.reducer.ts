import {omit} from 'lodash';
import * as actionTypes from './cf-instances.action-types';
import {cfInstances, CfInstancesState, CfInstances, Instance} from './cf-instances.state';

interface Action {
	type: string;
	cfInstanceUrl?: string;
	cfInstances?: CfInstances;
	instance?: Instance;
}

export function cfInstancesReducer(state: CfInstancesState = cfInstances, action: Action): CfInstancesState {
	switch (action.type) {
		case actionTypes.FETCH_CF_INSTANCES:
			return {...state, isLoadingCfInstances: true};
		case actionTypes.UPDATE_CF_INSTANCES:
			return {...state, isLoadingCfInstances: false, instances: {...state.instances, ...action.cfInstances}};
		case actionTypes.FETCH_CF_INSTANCES_FAILED:
			return {...state, isLoadingCfInstances: false};
		case actionTypes.REQUEST_ADD_INSTANCE:
			return {...state, isAddingNewCfInstance: true};
		case actionTypes.ADD_CF_INSTANCE:
			return {...state, isAddingNewCfInstance: false, instances: {...state.instances, ...action.cfInstances}};
		case actionTypes.ADD_CF_INSTANCE_FAILED:
			return {...state, isAddingNewCfInstance: false};
		case actionTypes.REQUEST_DELETE_CF_INSTANCE:
			return {...state, isDeletingCfInstance: true};
		case actionTypes.DELETE_CF_INSTANCE:
			return {
				...state,
				isDeletingCfInstance: false,
				instances: omit(state.instances, [action.instance.cfInstance]) as CfInstances
			};
		case actionTypes.DELETE_CF_INSTANCE_FAILED:
			return {...state, isDeletingCfInstance: false};
		default:
			return state;
	}
}
