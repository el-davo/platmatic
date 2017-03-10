import {FETCH_USERS_IN_ORGANIZATION, UPDATE_USERS_IN_ORGANIZATION, CLEAR_USERS_IN_ORGANIZATION} from './users.action-types';
import {fetchUsersInOrganization, updateUsersInOrganization, clearUsersInOrganization} from './users.actions';

describe('Users Actions', () => {

	describe('fetchUsersInOrganization()', () => {

		it('should fetch the users in an organization', () => {
			let organizationGuid = 'abc123';
			let page = 2;
			fetchUsersInOrganization(organizationGuid, page).should.eql({type: FETCH_USERS_IN_ORGANIZATION, organizationGuid, page});
		});
	});

	describe('updateUsersInOrganization()', () => {

		it('should fetch the users in an organization', () => {
			let users = <Array<any>>[{}, {}, {}];
			updateUsersInOrganization(users).should.eql({type: UPDATE_USERS_IN_ORGANIZATION, users});
		});
	});

	describe('clearUsersInOrganization()', () => {
		
		it('should clear the users in an organization', () => {
			clearUsersInOrganization().should.eql({type: CLEAR_USERS_IN_ORGANIZATION});
		});
	});
});
