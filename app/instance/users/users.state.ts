import {user} from '../../cloud/users/user.interface';

export const users: usersState = {
	isFetchingUsers: false,
	users: []
};

export interface usersState {
	isFetchingUsers: boolean;
	users: Array<user>;
}
