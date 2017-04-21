import * as actionTypes from './cf-instances.action-types';
import {CfInstances, Instance} from "./cf-instances.state";

export function fetchCfInstances() {
	return {type: actionTypes.FETCH_CF_INSTANCES};
}

export function updateCfInstances(cfInstances: CfInstances) {
	return {type: actionTypes.UPDATE_CF_INSTANCES, cfInstances};
}

export function fetchCfInstancesFailed() {
	return {type: actionTypes.FETCH_CF_INSTANCES_FAILED};
}

export function requestAddInstance(cfInstanceUrl: string, username: string, password: string) {
	return {type: actionTypes.REQUEST_ADD_INSTANCE, cfInstanceUrl, username, password};
}

export function addCfInstance(cfInstance: CfInstances) {
	return {type: actionTypes.ADD_CF_INSTANCE, cfInstance};
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
