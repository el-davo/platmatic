import {FETCH_USERS_IN_ORGANIZATION, UPDATE_USERS_IN_ORGANIZATION, CLEAR_USERS_IN_ORGANIZATION} from './users.action-types';
import {usersState} from './users.state';
import {usersReducer} from './users.reducer';
import {action} from './users.reducer';

describe('Users Reducer', () => {

	describe('FETCH_USERS_IN_ORGANIZATION', () => {

		it('should fetch users in the organization', () => {
			let action: action = {type: FETCH_USERS_IN_ORGANIZATION};
			let state: usersState = {isFetchingUsers: false, users: []};

			usersReducer(state, action).should.eql({isFetchingUsers: true, users: []});
		});
	});

	describe('UPDATE_USERS_IN_ORGANIZATION', () => {

		it('should update the users', () => {
			let action: action = {type: UPDATE_USERS_IN_ORGANIZATION, users: <any>[{}, {}]};
			let state: usersState = {isFetchingUsers: false, users: <any>[{}]};

			usersReducer(state, action).should.eql({isFetchingUsers: false, users: <any>[{}, {}, {}]});
		});
	});

	describe('CLEAR_USERS_IN_ORGANIZATION', () => {

		it('should clear users in an organization', () => {
			let action: action = {type: CLEAR_USERS_IN_ORGANIZATION};
			let state: usersState = {users: <any>[{}, {}], isFetchingUsers: false};

			usersReducer(state, action).should.eql({isFetchingUsers: false, users: <any>[]});
		});
	});
});
