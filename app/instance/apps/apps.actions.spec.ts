import {
  UPDATE_APPS,
  FETCH_APPS,
  CLEAR_APPS,
  NEXT_PAGE,
  PREV_PAGE,
  GO_TO_PAGE,
  START_APP,
  STOP_APP,
  REQUEST_DELETE_APP,
  APP_DELETED
} from './apps.action-types';
import {
  updateApps,
  fetchApps,
  clearApps,
  nextPage,
  prevPage,
  goToPage,
  startApp,
  stopApp,
  requestDeleteApp,
  appDeleted
} from './apps.actions';

describe('Apps Actions', () => {

  describe('updateApps()', () => {

    it('should emit action to update apps', () => {
      let result = [{name: 'test1'}, {name: 'test2'}];
      updateApps(result).should.eql({type: UPDATE_APPS, result});
    });
  });

  describe('fetchApps()', () => {

    it('should emit an action to fetch apps', () => {
      let guid = 'abc123';
      fetchApps(guid).should.eql({type: FETCH_APPS, guid});
    });
  });

  describe('clearApps()', () => {

    it('should emit an action to clear apps', () => {
      clearApps().should.eql({type: CLEAR_APPS});
    });
  });

  describe('nextPage()', () => {

    it('should emit an action to go to next page', () => {
      nextPage().should.eql({type: NEXT_PAGE});
    });
  });

  describe('prevPage()', () => {

    it('should emit an action to go to previous page', () => {
      prevPage().should.eql({type: PREV_PAGE});
    });
  });

  describe('goToPage()', () => {

    it('should emit an action to go to a specific page', () => {
      goToPage(10).should.eql({type: GO_TO_PAGE, page: 10});
    });
  });

  describe('startApp()', () => {

    it('should emit an action to start an app with a given id', () => {
      let guid = 'abc123';
      startApp(guid).should.eql({type: START_APP, guid});
    });
  });

  describe('stopApp()', () => {

    it('should emit an action to stop an app with a given id', () => {
      let guid = 'abc123';
      stopApp(guid).should.eql({type: STOP_APP, guid});
    });
  });

  describe('requestDeleteApp()', () => {

    it('should request that an app be deleted', () => {
      let app = {entity: {name: 'testApp'}};
      requestDeleteApp(app).should.eql({type: REQUEST_DELETE_APP, app});
    });
  });

  describe('appDeleted()', () => {

    it('should request that an app be deleted', () => {
      let app = {entity: {name: 'testApp'}};
      appDeleted(app).should.eql({type: APP_DELETED, app});
    });
  });
});


