import { takeEvery, delay } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { FETCH_USERS_IN_ORGANIZATION } from '../../instance/users/users.action-types';
import { fetchUsersInOrganization, updateUsersInOrganization } from '../../instance/users/users.actions';
import { usersService } from './users.service';
import { pagination } from '../common/pagination.interface';
import { user } from './user.interface';

function* fetch({organizationGuid, page}) {
    try {
        let settings = yield select((state: any) => state.settings);
        
        let users = yield call(usersService.fetchUsersInOgranization, settings, organizationGuid, page);
        
        yield put(updateUsersInOrganization(users.resources));

        yield call(delay, 100);

        users.page < users.total_pages ? yield put(fetchUsersInOrganization(organizationGuid, page + 1)) : null;
    } catch (e) {
        console.log(e);
    }
}

export function* fetchUsersSaga() {
    yield* takeEvery(FETCH_USERS_IN_ORGANIZATION, fetch);
}
