import {
  FETCH_SERVICE_INSTANCES_IN_SPACE,
  UPDATE_SERVICE_INSTANCES_IN_SPACE,
  FETCH_SERVICE_INSTANCES_FAILED,
  DELETE_SERVICE_INSTANCES_FROM_SPACE,
  DELETE_SERVICE_INSTANCE_COMPLETE,
  DELETE_SERVICE_INSTANCE_FAILED,
  CLEAR_SERVICE_INSTANCES
} from './service-instances.action-types';
import initialState from '../../initialState';
import {keyBy, omit} from 'lodash';

export function serviceInstancesReducer(state:any = initialState.serviceInstances, action: any) {
  switch (action.type) {
    case FETCH_SERVICE_INSTANCES_IN_SPACE:
      return {...state, page: action.page, isFetchingServiceInstances: true, fetchingServiceInstancesFailed: false};
    case UPDATE_SERVICE_INSTANCES_IN_SPACE:
      return {
        ...state, instances: {
          ...state.instances, ...keyBy(action.instances, (instance: any) => instance.metadata.guid)
        },
        isFetchingServiceInstances: false
      };
    case FETCH_SERVICE_INSTANCES_FAILED:
      return {...state, isFetchingServiceInstances: false, fetchingServiceInstancesFailed: true};
    case DELETE_SERVICE_INSTANCES_FROM_SPACE:
      return {
        ...state,
        instances: {
          ...state.instances,
          [action.serviceInstanceGuid]: {...state.instances[action.serviceInstanceGuid], isDeleting: true}
        }
      };
    case DELETE_SERVICE_INSTANCE_COMPLETE:
      return {...state, instances: omit(state.instances, [action.serviceInstanceGuid])};
    case DELETE_SERVICE_INSTANCE_FAILED:
      return {
        ...state,
        instances: {
          ...state.instances,
          [action.serviceInstanceGuid]: {...state.instances[action.serviceInstanceGuid], isDeleting: false}
        }
      };
    case CLEAR_SERVICE_INSTANCES:
      return {...state, instances: {}};
    default:
      return state;
  }
}
