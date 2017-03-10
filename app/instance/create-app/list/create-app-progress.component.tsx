import * as React from 'react';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import UploadIcon from 'material-ui/svg-icons/file/file-upload';
import LinearProgress from 'material-ui/LinearProgress';

const style = {
	progress: {
		height: 5
	}
};

interface props {
	app: any;
}

export class CreateAppProgressComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<ListItem primaryText={this.props.app.name}
								secondaryText={<LinearProgress mode="indeterminate" style={style.progress}/>}
								leftAvatar={<Avatar icon={<UploadIcon />}/>}/>
		)
	}
}
