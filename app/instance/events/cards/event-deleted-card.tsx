import * as React from 'react';
import TimeAgo from 'react-timeago'
import {List, ListItem} from 'material-ui/List';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {red600} from 'material-ui/styles/colors';
import EventIcon from 'material-ui/svg-icons/action/delete-forever';
import PersonIcon from 'material-ui/svg-icons/social/person-outline';

const style = {
	card: {
		marginBottom: 15
	}
};

interface props {
	event: any;
}

export class EventDeletedCardComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<Card style={style.card}>
				<CardHeader title={this.props.event.entity.actee_name}
										subtitle="App Deleted"
										avatar={<EventIcon color={red600}/>}/>
				<CardText>
					<List>
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
