import * as React from 'react';
import { Card, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import UserIcon from 'material-ui/svg-icons/action/account-circle';
import { LoadingComponent } from '../../common/loading.component';
import { usersState } from './users.state';

interface props {
	organizationGuid: string;
	users: usersState;
	fetchUsersInOrganization(organizationGuid: string, page: number);
	clearUsersInOrganization();
}

export class UsersComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);

		this._fetchUsers = this._fetchUsers.bind(this);
	}

	componentDidMount() {
		this._fetchUsers();
	}

	componentWillUnmount() {
		this.props.clearUsersInOrganization();
	}

	_fetchUsers() {
		this.props.fetchUsersInOrganization(this.props.organizationGuid, 1);
	}

	render() {
		return (
			<div>
				{
					!this.props.users.isFetchingUsers ? (
						<Card>
							<CardText>
								<List>
									{
										this.props.users.users.map((user, key) => {
											return <ListItem key={key} primaryText={user.entity.username} leftIcon={<UserIcon />} />
										})
									}
								</List>
							</CardText>
						</Card>
					) : (
							<div style={{ height: 150, textAlign: 'center' }}>
								<LoadingComponent />
							</div>
						)
				}
			</div>
		)
	}
}
