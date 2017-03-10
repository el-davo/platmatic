import {omit} from 'lodash';
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

export function createAppReducer(state: any = initialState.createApp, action: any) {
	switch (action.type) {
		case SHOW_CREATE_APP_DIALOG:
			return {...state, showCreateAppDialog: true, targetDirectory: action.targetDirectory};
		case HIDE_CREATE_APP_DIALOG:
			return {...state, showCreateAppDialog: false};
		case REQUEST_CREATE_APP:
			return {...state, initializing: {...state.initializing, [action.appId]: action.app}};
		case APP_INITIALIZATION_SUCCESS:
			return {
				...state,
				initializing: omit(state.initializing, [action.appId]),
				success: {...state.success, [action.appId]: {...action.app, completedTime: Date.now()}}
			};
		case APP_INITIALIZATION_FAILED:
			return {
				...state,
				initializing: omit(state.initializing, [action.appId]),
				failed: {...state.failed, [action.appId]: {...action.app, failedTime: Date.now()}}
			};

		// Create App Form
		case REQUEST_POPULATE_CREATE_APP_FORM:
			return {...state, form: {...state.form, isFetchingFormData: true, isFetchFormDataFailed: false}};
		case POPULATE_FORM_SPACES:
			return {...state, form: {...state.form, spaces: action.spaces}};
		case POPULATE_FORM_STACKS:
			return {...state, form: {...state.form, stacks: action.stacks}};
		case POPULATE_FORM_BUILDPACKS:
			return {...state, form: {...state.form, buildpacks: action.buildpacks}};
		case POPULATE_FORM_DOMAINS:
			return {...state, form: {...state.form, domains: action.domains}};
		case POPULATE_FORM_SUCCESS:
			return {...state, form: {...state.form, isFetchingFormData: false}};
		case POPULATE_FORM_FAILED:
			return {...state, form: {...state.form, isFetchingFormData: false, isFetchFormDataFailed: true}};
		default:
			return state;
	}
}
