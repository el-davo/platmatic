import * as React from 'react';
import TimeAgo from 'react-timeago'
import {List, ListItem} from 'material-ui/List';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {green600} from 'material-ui/styles/colors';
import EventIcon from 'material-ui/svg-icons/content/add-circle-outline';
import InstancesIcon from 'material-ui/svg-icons/editor/format-list-numbered';
import MemoryIcon from 'material-ui/svg-icons/hardware/memory';
import DiskIcon from 'material-ui/svg-icons/editor/pie-chart';
import NameIcon from 'material-ui/svg-icons/action/assignment';
import PersonIcon from 'material-ui/svg-icons/social/person-outline';
import ToggleDisplay from 'react-toggle-display';

const style = {
	card: {
		marginBottom: 15
	}
};

interface props {
	event: any;
}

export class EventCreatedCardComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<Card style={style.card}>
				<CardHeader title={this.props.event.entity.actee_name}
										subtitle="App Created"
										avatar={<EventIcon color={green600}/>}/>
				<CardText>
					<List>
						<ToggleDisplay if={this.props.event.entity.metadata.request.instances > 0}>
							<ListItem disabled={true}
												primaryText={this.props.event.entity.metadata.request.instances}
												secondaryText="Instances"
												leftIcon={<InstancesIcon />}/>
						</ToggleDisplay>
						<ToggleDisplay if={!!this.props.event.entity.metadata.request.memory}>
							<ListItem disabled={true}
												primaryText={`${this.props.event.entity.metadata.request.memory} MB`}
												secondaryText="Memory"
												leftIcon={<MemoryIcon />}/>
						</ToggleDisplay>
						<ToggleDisplay if={!!this.props.event.entity.metadata.request.disk_quota}>
							<ListItem disabled={true}
												primaryText={`${this.props.event.entity.metadata.request.disk_quota} MB`}
												secondaryText="Disk Limit"
												leftIcon={<DiskIcon />}/>
						</ToggleDisplay>
						<ToggleDisplay if={!!this.props.event.entity.metadata.request.name}>
							<ListItem disabled={true}
												primaryText={this.props.event.entity.metadata.request.name}
												secondaryText="Name"
												leftIcon={<NameIcon />}/>
						</ToggleDisplay>
						<ListItem disabled={true}
											primaryText={this.props.event.entity.actor_name}
											secondaryText={<TimeAgo date={this.props.event.entity.timestamp}/>}
											leftIcon={<PersonIcon />}/>
					</List>
				</CardText>
			</Card>
		)
	}
}
