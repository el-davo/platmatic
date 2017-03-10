import * as React from 'react';
import { Link } from 'react-router';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import SpacesIcon from 'material-ui/svg-icons/navigation/apps';
import SercvicesIcon from 'material-ui/svg-icons/device/devices';
import UsersIcon from 'material-ui/svg-icons/action/account-circle';
import { List, ListItem } from 'material-ui/List';

interface props {
	organizations: any;
	organization: any;
	fetchOrganizationSummary(organization_guid: string);
}

export class OrganizationCardComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);

		this._getSpaceCount = this._getSpaceCount.bind(this);
		this._getAppCount = this._getAppCount.bind(this);
		this._getServicesCount = this._getServicesCount.bind(this);
	}

	componentDidMount() {
		this._getData();
	}

	_getData() {
		this.props.fetchOrganizationSummary(this.props.organization.metadata.guid);
	}

	_getSpaceCount() {
		return (this.props.organizations.summary[this.props.organization.metadata.guid] || { spaces: [] }).spaces.length;
	}

	_getAppCount() {
		let appCount = 0;

		(this.props.organizations.summary[this.props.organization.metadata.guid] || { spaces: [] }).spaces.map(space => {
			appCount += space.app_count;
		});

		return appCount;
	}

	_getServicesCount() {
		let sericesCount = 0;

		(this.props.organizations.summary[this.props.organization.metadata.guid] || { spaces: [] }).spaces.map(spaces => {
			sericesCount += spaces.service_count;
		});

		return sericesCount;
	}

	render() {
		return (
			<Card>
				<CardHeader
					title={this.props.organization.entity.name}
					avatar="img/organization.png"
					subtitle={`${this._getAppCount()} Apps`}
					/>
				<CardText>
					<List>
						<Link to={`/organizations/${this.props.organization.metadata.guid}/spaces`}>
							<ListItem
								primaryText={`${(this._getSpaceCount() || '0')} Spaces`}
								leftIcon={<SpacesIcon />}
								/>
						</Link>
						<Link to={`/organizations/${this.props.organization.metadata.guid}/users`}>
							<ListItem
								primaryText="Users"
								leftIcon={<UsersIcon />}
								/>
						</Link>
					</List>
				</CardText>
			</Card>
		)
	}
}
