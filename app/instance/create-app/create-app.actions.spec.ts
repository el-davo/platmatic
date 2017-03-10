import 'should';
import {sep} from 'path';
import {
  SELECT_TARGET_DIRECTORY,
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

import {
  selectTargetDirectory,
  showCreateAppDialog,
  hideCreateAppDialog,
  requestCreateApp,
  appInitializationSuccess,
  appInitializationFailed,

  // Create App Form
  requestPopulateCreateAppForm,
  populateFormSpaces,
  populateFormStacks,
  populateFormBuildpacks,
  populateFormDomains,
  populateFormSuccess,
  populateFormFailed
} from './create-app.actions';

describe('Create App Actions', () => {

  describe('selectTargetDirectory()', () => {

    it('should show the create app dialog', () => {
      selectTargetDirectory().should.eql({type: SELECT_TARGET_DIRECTORY});
    });
  });

  describe('showCreateAppDialog()', () => {

    it('should show the create app dialog', () => {
      let targetDirectory = `${sep}temp`;
      showCreateAppDialog(targetDirectory).should.eql({type: SHOW_CREATE_APP_DIALOG, targetDirectory});
    });
  });

  describe('hideCreateAppDialog()', () => {

    it('should hide the create app dialog', () => {
      hideCreateAppDialog().should.eql({type: HIDE_CREATE_APP_DIALOG});
    });
  });


  describe('requestCreateApp()', () => {

    it('should initialize creation of a new app', () => {
      let appId = 'abc123';
      let app = {name: 'test_app'};
      requestCreateApp(appId, app).should.eql({type: REQUEST_CREATE_APP, appId, app});
    });
  });

  describe('appInitializationSuccess()', () => {

    it('should alert of initialization success', () => {
      let appId = 'abc123';
      let app = {guid: 'abc123'};
      appInitializationSuccess(appId, app).should.eql({type: APP_INITIALIZATION_SUCCESS, appId, app});
    });
  });

  describe('appInitializationFailed()', () => {

    it('should alert of an app initialization failure', () => {
      let appId = 'abc123';
      let app = {guid: 'abc123'};
      appInitializationFailed(appId, app).should.eql({type: APP_INITIALIZATION_FAILED, appId, app});
    });
  });

  describe('requestPopulateCreateAppForm()', () => {

    it('should request that the necessary data to create an app is got from the cf instance', () => {
      requestPopulateCreateAppForm().should.eql({type: REQUEST_POPULATE_CREATE_APP_FORM});
    });
  });

  describe('populateFormSpaces()', () => {

    it('should populate the select spaces field in the form', () => {
      let spaces = [{name: 'spaces1'}, {name: 'space2'}];
      populateFormSpaces(spaces).should.eql({type: POPULATE_FORM_SPACES, spaces});
    });
  });

  describe('populateFormStacks()', () => {

    it('should populate the select stacks field in the form', () => {
      let stacks = [{name: 'stack1'}, {name: 'stack2'}];
      populateFormStacks(stacks).should.eql({type: POPULATE_FORM_STACKS, stacks});
    });
  });

  describe('populateFormBuildpacks', () => {

    it('should populate the autocomplete field for buildpacks in the form', () => {
      let buildpacks = [{name: 'nodejs_buildpack'}];
      populateFormBuildpacks(buildpacks).should.eql({type: POPULATE_FORM_BUILDPACKS, buildpacks});
    })
  });

  describe('populateFormDomains', () => {

    it('should populate the autocomplete field for buildpacks in the form', () => {
      let domains = [{name: 'routes1'}];
      populateFormDomains(domains).should.eql({type: POPULATE_FORM_DOMAINS, domains});
    })
  });

  describe('populateFormSuccess()', () => {

    it('should indicate that the form has been populated', () => {
      populateFormSuccess().should.eql({type: POPULATE_FORM_SUCCESS});
    });
  });

  describe('populateFormFailed()', () => {

    it('should indicate that the form failed to populate', () => {
      populateFormFailed().should.eql({type: POPULATE_FORM_FAILED});
    });
  });

});
