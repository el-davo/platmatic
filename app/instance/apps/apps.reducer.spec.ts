import initialState from '../../initialState';
import {
  UPDATE_APPS,
  CLEAR_APPS,
  UPDATE_RESULTS_PER_PAGE,
  NEXT_PAGE,
  PREV_PAGE,
  GO_TO_PAGE
} from './apps.action-types';
import {appsReducer} from './apps.reducer';

describe('App Reducer', () => {

  describe('UPDATE_APPS', () => {

    it('should update apps list', () => {
      let action = {type: UPDATE_APPS, result: {resources: [{name: 'test1'}, {name: 'test2'}]}};

      appsReducer(initialState.apps, action).should.eql({...initialState.apps, result: action.result});
    });
  });

  describe('CLEAR_APPS', () => {

    it('should clear apps', () => {
      let action = {type: CLEAR_APPS};

      initialState.apps.result.resources = [{name: 'test1'}, {name: 'test2'}];
      initialState.apps.page = 2;

      appsReducer(initialState.apps, action).should.eql({...initialState.apps, page: 1, result: {resources: []}});
    });
  });

  describe('UPDATE_RESULTS_PER_PAGE', () => {

    it('should update results per page', () => {
      let action = {type: UPDATE_RESULTS_PER_PAGE, resultsPerPage: 25};

      initialState.apps.resultsPerPage = 10;

      appsReducer(initialState.apps, action).should.eql({...initialState.apps, resultsPerPage: 25});
    });
  });

  describe('NEXT_PAGE', () => {

    it('should go to next page', () => {
      let action = {type: NEXT_PAGE};

      initialState.apps.page = 10;

      appsReducer(initialState.apps, action).should.eql({...initialState.apps, result: {resources: []}, page: 11});
    });
  });

  describe('PREV_PAGE', () => {

    it('should go to next page', () => {
      let action = {type: PREV_PAGE};

      initialState.apps.page = 10;

      appsReducer(initialState.apps, action).should.eql({...initialState.apps, result: {resources: []}, page: 9});
    });
  });

  describe('GO_TO_PAGE', () => {

    it('should go to next page', () => {
      let action = {type: GO_TO_PAGE, page: 5};

      initialState.apps.page = 10;

      appsReducer(initialState.apps, action).should.eql({...initialState.apps, result: {resources: []}, page: 5});
    });
  });
});
