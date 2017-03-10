import {takeEvery, delay} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import {FETCH_SERVICE_INSTANCES_IN_SPACE} from '../../instance/service-instances/service-instances.action-types';
import {fetchServiceInstancesInSpaceById} from './service-instances.service';
import {
  fetchServiceInstancesInSpace,
  updateServiceInstancesInSpace,
  fetchServiceInstancesFailed
} from '../../instance/service-instances/service-instances.actions';

function* fetch({spaceGuid}) {
  try {
    let settings = yield select((state: any) => state.settings);
    let serviceInstance = yield select((state: any) => state.serviceInstances);

    let instances = yield call(fetchServiceInstancesInSpaceById, settings, spaceGuid);

    yield put(updateServiceInstancesInSpace(instances.resources));

    yield call(delay, 100);

    serviceInstance.page < instances.total_pages ? yield put(fetchServiceInstancesInSpace(spaceGuid, serviceInstance.page + 1)) : null;
  } catch (e) {
    yield put(fetchServiceInstancesFailed());
  }
}

export function* fetchServiceInstancesSaga() {
  yield* takeEvery(FETCH_SERVICE_INSTANCES_IN_SPACE, fetch);
}
