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
import {serviceInstancesReducer} from './service-instances.reducer';

describe('Service Instances Reducer', () => {

  describe('FETCH_SERVICE_INSTANCES_IN_SPACE', () => {

    it('should fetch service instances in a specified space', () => {
      let action = {type: FETCH_SERVICE_INSTANCES_IN_SPACE, spaceGuid: 'abc123', page: 2};
      let state = {
        ...initialState.serviceInstances,
        page: 1,
        isFetchingServiceInstances: false,
        fetchingServiceInstancesFailed: true
      };

      serviceInstancesReducer(state, action).should.eql({
        ...state,
        page: 2,
        isFetchingServiceInstances: true,
        fetchingServiceInstancesFailed: false
      });
    });
  });

  describe('UPDATE_SERVICE_INSTANCES_IN_SPACE', () => {

    it('should add the service instances to memory', () => {
      let action = {
        type: UPDATE_SERVICE_INSTANCES_IN_SPACE,
        instances: [{metadata: {guid: 'abc2'}}, {metadata: {guid: 'abc3'}}]
      };
      let state = {
        ...initialState.serviceInstances,
        instances: {abc1: {metadata: {guid: 'abc1'}}},
        isFetchingServiceInstances: true
      };

      serviceInstancesReducer(state, action).should.eql({
        ...state,
        instances: {
          abc1: {metadata: {guid: 'abc1'}},
          abc2: {metadata: {guid: 'abc2'}},
          abc3: {metadata: {guid: 'abc3'}},
        },
        isFetchingServiceInstances: false
      });
    });
  });

  describe('FETCH_SERVICE_INSTANCES_FAILED', () => {

    it('should inform the user that fetching service instances has failed', () => {
      let action = {type: FETCH_SERVICE_INSTANCES_FAILED};
      let state = {
        ...initialState.serviceInstances,
        isFetchingServiceInstances: true,
        fetchingServiceInstancesFailed: false
      };

      serviceInstancesReducer(state, action).should.eql({
        ...state,
        isFetchingServiceInstances: false,
        fetchingServiceInstancesFailed: true
      });
    });
  });

  describe('DELETE_SERVICE_INSTANCES_FROM_SPACE', () => {

    it('should delete a service instance from a specified space', () => {
      let action = {type: DELETE_SERVICE_INSTANCES_FROM_SPACE, serviceInstanceGuid: 'abc2'};
      let state = {
        ...initialState.serviceInstances,
        instances: {
          abc1: {metadata: {guid: 'abc1'}},
          abc2: {metadata: {guid: 'abc2'}},
          abc3: {metadata: {guid: 'abc3'}},
        },
      };

      serviceInstancesReducer(state, action).should.eql({
        ...state,
        instances: {
          abc1: {metadata: {guid: 'abc1'}},
          abc2: {metadata: {guid: 'abc2'}, isDeleting: true},
          abc3: {metadata: {guid: 'abc3'}},
        },
      });
    });
  });

  describe('DELETE_SERVICE_INSTANCE_COMPLETE', () => {

    it('should update the state to reflect the delete service instance', () => {
      let action = {type: DELETE_SERVICE_INSTANCE_COMPLETE, serviceInstanceGuid: 'abc2'};
      let state = {
        ...initialState.serviceInstances,
        instances: {
          abc1: {metadata: {guid: 'abc1'}},
          abc2: {metadata: {guid: 'abc2'}, isDeleting: true},
          abc3: {metadata: {guid: 'abc3'}},
        },
      };

      serviceInstancesReducer(state, action).should.eql({
        ...state,
        instances: {
          abc1: {metadata: {guid: 'abc1'}},
          abc3: {metadata: {guid: 'abc3'}},
        },
      });
    });
  });

  describe('DELETE_SERVICE_INSTANCE_FAILED', () => {

    it('should update the state to reflect the delete service instance', () => {
      let action = {type: DELETE_SERVICE_INSTANCE_FAILED, serviceInstanceGuid: 'abc2'};
      let state = {
        ...initialState.serviceInstances,
        instances: {
          abc1: {metadata: {guid: 'abc1'}},
          abc2: {metadata: {guid: 'abc2'}, isDeleting: true},
          abc3: {metadata: {guid: 'abc3'}},
        },
      };

      serviceInstancesReducer(state, action).should.eql({
        ...state,
        instances: {
          abc1: {metadata: {guid: 'abc1'}},
          abc2: {metadata: {guid: 'abc2'}, isDeleting: false},
          abc3: {metadata: {guid: 'abc3'}},
        },
      });
    });
  });

  describe('CLEAR_SERVICE_INSTANCES', () => {

    it('should clear the service instances from the state', () => {
      let action = {type: CLEAR_SERVICE_INSTANCES, serviceInstanceGuid: 'abc2'};
      let state = {
        ...initialState.serviceInstances,
        instances: {
          abc1: {metadata: {guid: 'abc1'}},
          abc2: {metadata: {guid: 'abc2'}},
          abc3: {metadata: {guid: 'abc3'}},
        },
      };

      serviceInstancesReducer(state, action).should.eql({...state, instances: {}});
    });
  });
});
