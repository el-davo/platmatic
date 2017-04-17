import {takeEvery, delay} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {REQUEST_CREATE_APP} from '../../instance/create-app/create-app.action-types';
import {getAppsInSpace} from '../spaces/spaces.service';
import {fetchAppSummary, deleteApp} from '../apps/apps.service';
import {checkRouteExists, createRoute, associateAppWithRoute} from '../routes/routes.service';
import {
	createTmpDir,
	getCfignoreGlobs,
	zipFolder,
	createApp,
	uploadAppBits,
	hasJobCompleted,
	startApp
} from './create-app.service';
import {appInitializationSuccess, appInitializationFailed} from '../../instance/create-app/create-app.actions';
import {SettingsState} from "../../settings/settings.state";

function* create({appId, app}) {

	try {
		let settings: SettingsState = yield select((state: any) => state.settings);
		let targetDirectory = yield select((state: any) => state.createApp.targetDirectory);

		// Calculate what files to ignore
		let ignoreGlobs = yield call(getCfignoreGlobs, targetDirectory);

		// Create a temporary folder to hold the zip
		let {tmpDir, cleanup} = yield call(createTmpDir);
		// Zip up the app
		let zipFile = yield call(zipFolder, tmpDir, targetDirectory, ignoreGlobs);

		// Check if app exists
		let existingApp = yield call(getAppsInSpace, settings.activeInstance, app.space_guid, `name:${app.name}`);

		// Delete the app if it already exists
		existingApp.resources.length === 1 ? yield call(deleteApp, settings.activeInstance, existingApp.resources[0].metadata.guid) : null;

		// Create a new app instance
		let createdApp = yield call(createApp, settings.activeInstance, app);

		// Upload the zip file
		let job = yield call(uploadAppBits, settings.activeInstance, createdApp, zipFile);

		// Wait for app to finish processing uploaded files
		for (let i = 0; i < 20; i++) {
			let {entity: {status}} = yield call(hasJobCompleted, settings.activeInstance, job);

			if (status === 'failed') {
				throw new Error('Uploading files failed');
			}

			if (status === 'finished') {
				break;
			}

			yield call(delay, 5000);
		}

		// Start the app
		yield call(startApp, settings.activeInstance, createdApp);

		// Wait for app to start
		for (let i = 0; i < 20; i++) {

			let waiting = yield call(fetchAppSummary, settings.activeInstance, createdApp.metadata.guid);

			if (waiting.package_state === 'FAILED') {
				throw new Error('App failed to stage');
			}

			if (waiting.package_state === 'STAGED') {
				break;
			}

			yield call(delay, 5000);
		}

		// Check if the route exists
		let routeExists = yield call(checkRouteExists, settings.activeInstance, app.domain_guid, app.name);

		// Create the route if it doesn't exist
		if (!routeExists) {
			let route = yield call(createRoute, settings.activeInstance, app.domain_guid, app.space_guid, app.name);

			yield call(associateAppWithRoute, settings.activeInstance, route.metadata.guid, createdApp.metadata.guid);
		}

		cleanup();

		yield put(appInitializationSuccess(appId, app));

	} catch (err) {
		console.log(err);

		yield put(appInitializationFailed(appId, app));
	}
}

export function* createAppSaga() {
	yield* takeEvery(REQUEST_CREATE_APP, create);
}
