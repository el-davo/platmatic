import {
  FETCH_SERVICE_INSTANCES_IN_SPACE,
  UPDATE_SERVICE_INSTANCES_IN_SPACE,
  FETCH_SERVICE_INSTANCES_FAILED,
  DELETE_SERVICE_INSTANCES_FROM_SPACE,
  DELETE_SERVICE_INSTANCE_COMPLETE,
  DELETE_SERVICE_INSTANCE_FAILED,
  CLEAR_SERVICE_INSTANCES
} from './service-instances.action-types';

export function fetchServiceInstancesInSpace(spaceGuid, page = 1) {
  return {type: FETCH_SERVICE_INSTANCES_IN_SPACE, spaceGuid, page};
}

export function updateServiceInstancesInSpace(instances) {
  return {type: UPDATE_SERVICE_INSTANCES_IN_SPACE, instances};
}

export function fetchServiceInstancesFailed() {
  return {type: FETCH_SERVICE_INSTANCES_FAILED};
}

export function deleteServiceInstancesFromSpace(serviceInstanceGuid) {
  return {type: DELETE_SERVICE_INSTANCES_FROM_SPACE, serviceInstanceGuid};
}

export function deleteServiceInstanceComplete(serviceInstanceGuid) {
  return {type: DELETE_SERVICE_INSTANCE_COMPLETE, serviceInstanceGuid};
}

export function deleteServiceInstanceFailed(serviceInstanceGuid) {
  return {type: DELETE_SERVICE_INSTANCE_FAILED, serviceInstanceGuid};
}

export function clearServiceInstances() {
  return {type: CLEAR_SERVICE_INSTANCES};
}
