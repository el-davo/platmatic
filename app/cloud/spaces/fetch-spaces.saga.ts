import {takeEvery} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {FETCH_SPACES} from '../../instance/spaces/spaces.action-types';
import {updateSpaces} from '../../instance/spaces/spaces.actions';
import {fetchSpacesInOrganization} from './spaces.service';
import {SettingsState} from "../../settings/settings.state";

function* fetch({organization_guid}) {

	try {
		let settings: SettingsState = yield select((state: any) => state.settings);

		let {spaces} = yield call(fetchSpacesInOrganization, settings.activeInstance, organization_guid);

		yield put(updateSpaces(spaces));
	} catch (e) {
		console.log(e);
	}
}

export function* fetchSpacesSaga() {
	yield* takeEvery(FETCH_SPACES, fetch);
}
