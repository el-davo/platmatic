import * as React from 'react';
import { Link } from 'react-router';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { List, ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import SpaceIcon from 'material-ui/svg-icons/device/storage';
import AppsIcon from 'material-ui/svg-icons/navigation/apps';
import SercvicesIcon from 'material-ui/svg-icons/device/devices';

interface props {
	organization_guid: string,
	space: any
}
export class SpaceCardComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<Card>
				<CardHeader
					title={this.props.space.name}
					avatar={<Avatar icon={<SpaceIcon />} backgroundColor="#00776D" />} />
				<CardText>
					<List>
						<Link to={`/organizations/${this.props.organization_guid}/spaces/${this.props.space.guid}/apps`}>
							<ListItem
								primaryText={`${this.props.space.app_count || '0'} Apps`}
								leftIcon={<AppsIcon />} />
						</Link>

						<Link
							to={`/organizations/${this.props.organization_guid}/spaces/${this.props.space.guid}/service-instances`}>
							<ListItem
								primaryText={`${this.props.space.service_count || '0'} Services`}
								leftIcon={<SercvicesIcon />} />
						</Link>
					</List>
				</CardText>
			</Card>
		)
	}
}
