import * as React from 'react';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FailedIcon from 'material-ui/svg-icons/action/report-problem';
import TimeAgo from 'react-timeago'

interface props {
	app: any
}

export class CreateAppFailedComponent extends React.Component<props, any> {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <ListItem primaryText={this.props.app.name}
                leftAvatar={<Avatar icon={<FailedIcon />}/>}
                secondaryText={<TimeAgo date={this.props.app.failedTime} />}/>
    )
  }
}
