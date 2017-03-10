import * as React from 'react';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import UploadIcon from 'material-ui/svg-icons/action/done';
import TimeAgo from 'react-timeago'

interface props {
	app: any
}

export class CreateAppSuccessComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<ListItem primaryText={this.props.app.name}
								leftAvatar={<Avatar icon={<UploadIcon />}/>}
								secondaryText={<TimeAgo date={this.props.app.completedTime} />}/>
		)
	}
}
