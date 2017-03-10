import {FETCH_USERS_IN_ORGANIZATION, UPDATE_USERS_IN_ORGANIZATION, CLEAR_USERS_IN_ORGANIZATION} from './users.action-types';
import {user} from '../../cloud/users/user.interface';

export function fetchUsersInOrganization(organizationGuid: string, page: number) {
	return {type: FETCH_USERS_IN_ORGANIZATION, organizationGuid, page};
}

export function updateUsersInOrganization(users: Array<user>) {
	return {type: UPDATE_USERS_IN_ORGANIZATION, users};
}

export function clearUsersInOrganization() {
	return {type: CLEAR_USERS_IN_ORGANIZATION};
}