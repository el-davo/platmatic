import * as actionTypes from './cf-instances.action-types';
import {CfInstance, Instance} from "./cf-instances.state";

export function fetchCfInstances() {
	return {type: actionTypes.FETCH_CF_INSTANCES};
}

export function updateCfInstances(instances: CfInstance) {
	return {type: actionTypes.UPDATE_CF_INSTANCES, instances};
}

export function fetchCfInstancesFailed() {
	return {type: actionTypes.FETCH_CF_INSTANCES_FAILED};
}

export function requestAddInstance(cfInstance: string, username: string, password: string) {
	return {type: actionTypes.REQUEST_ADD_INSTANCE, cfInstance, username, password};
}

export function addCfInstance(instance: CfInstance) {
	return {type: actionTypes.ADD_CF_INSTANCE, instance};
}

export function addCfInstanceFailed() {
	return {type: actionTypes.ADD_CF_INSTANCE_FAILED};
}

export function requestDeleteCfInstance(instance: Instance) {
	return {type: actionTypes.REQUEST_DELETE_CF_INSTANCE, instance};
}

export function deleteCfInstance(instance: Instance) {
	return {type: actionTypes.DELETE_CF_INSTANCE, instance};
}

export function deleteCfInstanceFailed() {
	return {type: actionTypes.DELETE_CF_INSTANCE_FAILED};
}
