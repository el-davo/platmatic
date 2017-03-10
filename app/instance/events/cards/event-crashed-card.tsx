import * as React from 'react';
import {red600} from 'material-ui/styles/colors';
import EventIcon from 'material-ui/svg-icons/alert/error-outline';
import {Card, CardHeader, CardText} from 'material-ui/Card';

const style = {
	card: {
		marginBottom: 15
	}
};

interface props {
	event: any;
}

export class EventCrashedCardComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<Card style={style.card}>
				<CardHeader title={this.props.event.entity.actee_name}
										subtitle="App Crashed"
										avatar={<EventIcon color={red600}/>}/>
				<CardText>
					{this.props.event.entity.metadata.exit_description}
				</CardText>
			</Card>
		)
	}
}
