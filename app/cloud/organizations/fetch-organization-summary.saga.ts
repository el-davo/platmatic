import {takeEvery, takeLatest} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {FETCH_ORGANIZATION_SUMMARY} from '../../instance/organizations/organizations.action-types';
import {fetchOrganizationSummary} from './organization.service';
import {updateOrganizationSummary} from '../../instance/organizations/organizations.actions';

function* fetch({organization_guid}) {
  try {
    let settings = yield select((state: any) => state.settings);

    let summary = yield call(fetchOrganizationSummary, settings, organization_guid);

    yield put(updateOrganizationSummary(summary));
  } catch (e) {
    console.log(e);
  }
}

export function* fetchOrganizationSummarySaga() {
  yield* takeEvery(FETCH_ORGANIZATION_SUMMARY, fetch);
}
