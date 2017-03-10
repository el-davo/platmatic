import {takeLatest} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {REQUEST_POPULATE_CREATE_APP_FORM} from '../../../instance/create-app/create-app.action-types';
import {fetchAllSpaces} from '../../spaces/spaces.service';
import {fetchStacks} from '../../stacks/stacks.services';
import {fetchAllBuildpacks} from '../../buildpacks/buildpacks.service';
import {fetchAllDomains} from '../../domains/domains.service';
import {
	populateFormSpaces,
	populateFormStacks,
	populateFormBuildpacks,
	populateFormDomains,
	populateFormSuccess,
	populateFormFailed
} from '../../../instance/create-app/create-app.actions';

function* populate() {
	try {
		let settings = yield select((state: any) => state.settings);

		let [spaces, stacks, buildpacks, domains] = yield [
			call(fetchAllSpaces, settings),
			call(fetchStacks, settings),
			call(fetchAllBuildpacks, settings),
			call(fetchAllDomains, settings)
		];

		yield put(populateFormSpaces(spaces.resources));
		yield put(populateFormStacks(stacks.resources));
		yield put(populateFormBuildpacks(buildpacks.resources));
		yield put(populateFormDomains(domains.resources));

		yield put(populateFormSuccess());

	} catch (err) {
		console.log(err);

		yield put(populateFormFailed());
	}
}

export function* createAppGetModalDataSaga() {
	yield* takeLatest(REQUEST_POPULATE_CREATE_APP_FORM, populate);
}
