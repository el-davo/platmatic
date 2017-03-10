import {takeLatest, delay} from 'redux-saga';
import {call, put} from 'redux-saga/effects';
import {SELECT_TARGET_DIRECTORY} from '../../instance/create-app/create-app.action-types';
import {selectDirectory} from './create-app.service';
import {showCreateAppDialog} from '../../instance/create-app/create-app.actions';

function* openDialog() {

  try {
    let targetDirectory = yield call(selectDirectory);

    yield put(showCreateAppDialog(targetDirectory));
  } catch (err) {
    console.log(err);
  }
}

export function* selectTargetDirectorySaga() {
  yield* takeLatest(SELECT_TARGET_DIRECTORY, openDialog);
}
