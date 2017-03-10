import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './users.actions';
import { BreadcrumbComponent } from '../../common/breadcrumb.component';
import { UsersComponent } from './users.component';
import { usersState } from './users.state';

interface props {
	routes: any;
	organizationGuid: string;
	users: usersState;
	actions: actions;
}

interface actions {
	fetchUsersInOrganization(organizationGuid: string, page: number);
	clearUsersInOrganization();
}

const UsersContainer: React.StatelessComponent<props> = props => {
	return (
		<div>
			<BreadcrumbComponent routes={props.routes} />

			<UsersComponent
				organizationGuid={props.organizationGuid}
				users={props.users}
				fetchUsersInOrganization={props.actions.fetchUsersInOrganization}
				clearUsersInOrganization={props.actions.clearUsersInOrganization} />
		</div>
	);
};

function mapStateToProps(state: props, ownProps: any) {
	return {
		organizationGuid: ownProps.params.organization_guid,
		users: state.users
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({ ...actions }, dispatch)
	};
}

export default connect<{}, {}, any>(
	mapStateToProps,
	mapDispatchToProps
)(UsersContainer);
