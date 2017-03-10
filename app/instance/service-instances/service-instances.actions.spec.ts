import {
  FETCH_SERVICE_INSTANCES_IN_SPACE,
  UPDATE_SERVICE_INSTANCES_IN_SPACE,
  FETCH_SERVICE_INSTANCES_FAILED,
  DELETE_SERVICE_INSTANCES_FROM_SPACE,
  DELETE_SERVICE_INSTANCE_COMPLETE,
  DELETE_SERVICE_INSTANCE_FAILED,
  CLEAR_SERVICE_INSTANCES
} from './service-instances.action-types';
import {
  fetchServiceInstancesInSpace,
  updateServiceInstancesInSpace,
  fetchServiceInstancesFailed,
  deleteServiceInstancesFromSpace,
  deleteServiceInstanceComplete,
  deleteServiceInstanceFailed,
  clearServiceInstances
} from './service-instances.actions';

describe('Service Instances Actions', () => {

  describe('fetchServicesInSpace()', () => {

    it('should fetch services in a specified space', () => {
      let spaceGuid = 'abc123';
      let page = 2;
      fetchServiceInstancesInSpace(spaceGuid, page).should.eql({
        type: FETCH_SERVICE_INSTANCES_IN_SPACE,
        spaceGuid,
        page: 2
      })
    });

    it('should default page to 1 if not set', () => {
      let spaceGuid = 'abc123';
      fetchServiceInstancesInSpace(spaceGuid).should.eql({type: FETCH_SERVICE_INSTANCES_IN_SPACE, spaceGuid, page: 1})
    });
  });

  describe('updateServicesInSpace()', () => {

    it('should add services to the list of services in the space', () => {
      let instances = [{}, {}, {}];
      updateServiceInstancesInSpace(instances).should.eql({
        type: UPDATE_SERVICE_INSTANCES_IN_SPACE,
        instances
      });
    });
  });

  describe('fetchServicesFailed()', () => {

    it('should inform the user that fetching services has failed', () => {
      fetchServiceInstancesFailed().should.eql({type: FETCH_SERVICE_INSTANCES_FAILED});
    });
  });

  describe('deleteServiceFromSpace()', () => {

    it('should delete a services from a space', () => {
      let serviceInstanceGuid = 'abc123';
      deleteServiceInstancesFromSpace(serviceInstanceGuid).should.eql({
        type: DELETE_SERVICE_INSTANCES_FROM_SPACE,
        serviceInstanceGuid
      });
    });
  });

  describe('deleteServiceInstanceComplete()', () => {

    it('should inform the user that a service instance has been deleted', () => {
      let serviceInstanceGuid = 'abc123';
      deleteServiceInstanceComplete(serviceInstanceGuid).should.eql({
        type: DELETE_SERVICE_INSTANCE_COMPLETE,
        serviceInstanceGuid
      });
    });
  });

  describe('deleteServiceInstanceFailed()', () => {
    let serviceInstanceGuid = 'abc123';
    deleteServiceInstanceFailed(serviceInstanceGuid).should.eql({
      type: DELETE_SERVICE_INSTANCE_FAILED,
      serviceInstanceGuid
    });
  });

  describe('clearServiceInstances()', () => {

    it('should clear the service instances from the memory', () => {
      clearServiceInstances().should.eql({type: CLEAR_SERVICE_INSTANCES});
    });
  });
});
