import * as React from 'react';
import {ListItem} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import StatusIcon from 'material-ui/svg-icons/av/fiber-manual-record';
import {green600, red600, grey400} from 'material-ui/styles/colors';

interface props {
	app: any;
	requestLoginSSH(app: any, appInstance: number);
	requestLogStream(app: any);
}

export class AppResultComponent extends React.Component<props, any> {

  constructor(props, context) {
    super(props, context);

    this._openSSH = this._openSSH.bind(this);
    this._openLogs = this._openLogs.bind(this);
  }

  _openSSH() {
    this.props.requestLoginSSH(this.props.app, 0);
  }

  _openLogs() {
    this.props.requestLogStream(this.props.app);
  }

  render() {
    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={grey400}/>
      </IconButton>
    );

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onClick={this._openSSH}>SSH</MenuItem>
        <MenuItem onClick={this._openLogs}>Logs</MenuItem>
      </IconMenu>
    );

    return (
      <ListItem disabled={true}
                primaryText={this.props.app.entity.name}
                leftIcon={<StatusIcon color={this.props.app.entity.state === 'STARTED' ? green600 : red600}/>}
                rightIconButton={rightIconMenu}/>
    )
  }
}
