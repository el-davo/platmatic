import * as React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import EventIcon from 'material-ui/svg-icons/communication/call-split';
import PersonIcon from 'material-ui/svg-icons/social/person-outline';
import TimeAgo from 'react-timeago'

const style = {
	card: {
		marginBottom: 15
	}
};

interface props {
	event: any;
}

export class EventMapRouteCardComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<Card card={style.card}>
				<CardHeader title={this.props.event.entity.actee_name}
										subtitle="Mapped Route"
										avatar={<EventIcon/>}/>
				<CardText>
					<List>
						<ListItem disabled={true}
											primaryText={this.props.event.entity.actor_name}
											secondaryText={<TimeAgo date={this.props.event.entity.timestamp} />}
											leftIcon={<PersonIcon />}/>
					</List>
				</CardText>
			</Card>
		)
	}
}
