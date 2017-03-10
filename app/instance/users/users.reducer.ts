import { users, usersState } from './users.state';
import { user } from '../../cloud/users/user.interface';
import { FETCH_USERS_IN_ORGANIZATION, UPDATE_USERS_IN_ORGANIZATION, CLEAR_USERS_IN_ORGANIZATION } from './users.action-types';

export interface action {
	type: string;
	organizationGuid?: string;
	users?: Array<user>;
}

export function usersReducer(state: usersState = users, action: action): usersState {
	switch (action.type) {
		case FETCH_USERS_IN_ORGANIZATION:
			return <usersState>{ ...state, isFetchingUsers: true };
		case UPDATE_USERS_IN_ORGANIZATION:
			return <usersState>{ ...state, isFetchingUsers: false, users: [...state.users, ...action.users] };
		case CLEAR_USERS_IN_ORGANIZATION:
			return <usersState>{ ...state, users: [] };
		default:
			return state;
	}
}
