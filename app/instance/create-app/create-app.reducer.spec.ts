import {useFakeTimers} from 'sinon';
import {sep} from 'path';
import initialState from '../../initialState';
import {
  SHOW_CREATE_APP_DIALOG,
  HIDE_CREATE_APP_DIALOG,
  REQUEST_CREATE_APP,
  APP_INITIALIZATION_SUCCESS,
  APP_INITIALIZATION_FAILED,

  // Create App Form
  REQUEST_POPULATE_CREATE_APP_FORM,
  POPULATE_FORM_SPACES,
  POPULATE_FORM_STACKS,
  POPULATE_FORM_BUILDPACKS,
  POPULATE_FORM_DOMAINS,
  POPULATE_FORM_SUCCESS,
  POPULATE_FORM_FAILED
} from './create-app.action-types';

import {createAppReducer} from './create-app.reducer';

describe('Create App Reducer', () => {

  let clock;
  let now;

  beforeEach(() => {
    now = Date.now();
    clock = useFakeTimers(now);
  });

  afterEach(() => {
    clock.restore();
  });

  describe('SHOW_CREATE_APP_DIALOG', () => {

    it('should show the create app dialog', () => {
      let action = {type: SHOW_CREATE_APP_DIALOG, targetDirectory: `${sep}test`};
      let state = {...initialState.createApp, showCreateAppDialog: false};

      createAppReducer(state, action).should.eql({
        ...state,
        showCreateAppDialog: true,
        targetDirectory: `${sep}test`
      });
    });
  });

  describe('HIDE_CREATE_APP_DIALOG', () => {

    it('should hide the create app dialog', () => {
      let action = {type: HIDE_CREATE_APP_DIALOG};
      let state = {...initialState.createApp, showCreateAppDialog: true};

      createAppReducer(state, action).should.eql({...state, showCreateAppDialog: false});
    });
  });

  describe('REQUEST_CREATE_APP', () => {

    it('should request creating a new app', () => {
      let action = {type: REQUEST_CREATE_APP, appId: 'test2', app: {name: 'test2'}};
      let state = {...initialState.createApp, initializing: {test1: {name: 'test1'}}};

      createAppReducer(state, action).should.eql({
        ...state,
        initializing: {...state.initializing, test2: {name: 'test2'}}
      });
    });
  });

  describe('APP_INITIALIZATION_SUCCESS', () => {

    it('should move the app to the uploading list', () => {
      let action = {type: APP_INITIALIZATION_SUCCESS, appId: 'test1', app: {name: 'test1'}};
      let state: any = {...initialState.createApp, initializing: {test1: {name: 'test1'}, test2: {name: 'test2'}}};

      createAppReducer(state, action).should.eql({
        ...state,
        initializing: {test2: {name: 'test2'}},
        success: {...state.success, test1: {name: 'test1', completedTime: now}}
      });
    });
  });

  describe('APP_INITIALIZATION_FAILED', () => {

    it('should move the app to the failed list', () => {
      let action = {type: APP_INITIALIZATION_FAILED, appId: 'test1', app: {name: 'test1'}};
      let state: any = {...initialState.createApp, initializing: {test1: {name: 'test1'}, test2: {name: 'test2'}}};

      createAppReducer(state, action).should.eql({
        ...state,
        initializing: {test2: {name: 'test2'}},
        failed: {...state.failed, test1: {name: 'test1', failedTime: now}}
      });
    });
  });

  // Create App Form
  describe('REQUEST_POPULATE_CREATE_APP_FORM', () => {

    it('should request that the create app form is populated with the necessary data', () => {
      let action = {type: REQUEST_POPULATE_CREATE_APP_FORM};
      let state = {...initialState.createApp, form: {isFetchingFormData: false, isFetchFormDataFailed: true}};

      createAppReducer(state, action).should.eql({
        ...state,
        form: {isFetchingFormData: true, isFetchFormDataFailed: false}
      });
    });
  });

  describe('POPULATE_FORM_SPACES', () => {

    it('should populate the spaces select field', () => {
      let action = {type: POPULATE_FORM_SPACES, spaces: [{name: 'test2'}]};
      let state = {...initialState.createApp, form: {isFetchingFormData: true, spaces: [{name: 'test1'}]}};
      let expected = {...state, form: {isFetchingFormData: true, spaces: [{name: 'test2'}]}};

      createAppReducer(state, action).should.eql(expected);
    });
  });

  describe('POPULATE_FORM_STACKS', () => {

    it('should populate the spaces select field', () => {
      let action = {type: POPULATE_FORM_STACKS, stacks: [{name: 'stack2'}]};
      let state = {...initialState.createApp, form: {isFetchingFormData: true, stacks: [{name: 'stack1'}]}};
      let expected = {...state, form: {isFetchingFormData: true, stacks: [{name: 'stack2'}]}};

      createAppReducer(state, action).should.eql(expected);
    });
  });

  describe('POPULATE_FORM_BUILDPACKS', () => {

    it('should populate the buildpacks select field', () => {
      let action = {type: POPULATE_FORM_BUILDPACKS, buildpacks: [{name: 'nodejs_buildpack'}]};
      let state = {...initialState.createApp, form: {isFetchingFormData: true, buildpacks: [{name: 'buildpack1'}]}};
      let expected = {...state, form: {isFetchingFormData: true, buildpacks: [{name: 'nodejs_buildpack'}]}};

      createAppReducer(state, action).should.eql(expected);
    });
  });

  describe('POPULATE_FORM_DOMAINS', () => {

    it('should populate the routes select field', () => {
      let action = {type: POPULATE_FORM_DOMAINS, domains: [{name: 'domains1'}]};
      let state = {...initialState.createApp, form: {isFetchingFormData: true, domains: [{name: 'domains2'}]}};
      let expected = {...state, form: {isFetchingFormData: true, domains: [{name: 'domains1'}]}};

      createAppReducer(state, action).should.eql(expected);
    });
  });

  describe('POPULATE_FORM_SUCCESS', () => {

    it('should indicate that all form data is retrieved', () => {
      let action = {type: POPULATE_FORM_SUCCESS};
      let state = {...initialState.createApp, form: {...initialState.createApp.form, isFetchingFormData: true}};
      let expected = {...state, form: {...state.form, isFetchingFormData: false}};

      createAppReducer(state, action).should.eql(expected);
    });
  });

  describe('POPULATE_FORM_FAILED', () => {

    it('should indicate that all form data is retrieved', () => {
      let action = {type: POPULATE_FORM_FAILED};
      let state = {...initialState.createApp, form: {isFetchingFormData: true, isFetchFormDataFailed: false}};
      let expected = {...state, form: {...state.form, isFetchingFormData: false, isFetchFormDataFailed: true}};

      createAppReducer(state, action).should.eql(expected);
    });
  });

});
