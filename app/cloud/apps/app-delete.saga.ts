import {takeEvery} from 'redux-saga';
import {select, call, put} from 'redux-saga/effects';
import {toastr} from 'react-redux-toastr';
import {REQUEST_DELETE_APP} from '../../instance/apps/apps.action-types';
import {deleteApp} from './apps.service';
import {appDeleted} from '../../instance/apps/apps.actions'
import {SettingsState} from "../../settings/settings.state";

function* execute({app}) {

  try {
    let settings: SettingsState = yield select((state: any) => state.settings);

    yield call(deleteApp, settings.activeInstance, app.metadata.guid);

    yield put(appDeleted(app));

    toastr.success('Alert', 'App deleted successfully');
  } catch (err) {
  	console.log(err);

    toastr.error('Alert', 'Unable to delete app');
  }
}

export function* appDeleteSaga() {
  yield* takeEvery(REQUEST_DELETE_APP, execute);
}
