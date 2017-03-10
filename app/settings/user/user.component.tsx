import * as React from 'react';
const {shell} = require('electron');
import {Card, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import LoggedInIcon from 'material-ui/svg-icons/action/check-circle';
import {green700} from 'material-ui/styles/colors';

let styles = {
  icon: {
    height: 100,
    width: 100
  }
};

export class UserComponent extends React.Component<any, any> {

  constructor(props, context) {
    super(props, context);

    this._openCloudLink = this._openCloudLink.bind(this);
    this._logout = this._logout.bind(this);
  }

  _openCloudLink(event) {
    event.preventDefault();
    shell.openExternal(this.props.settings.cfInstance);
  }

  _logout() {
    this.props.requestLogout();
  }

  render() {
    return (
      <Card>
        <CardTitle title="Settings"/>
        <CardText>
          <div style={{textAlign: 'center'}}>
            <LoggedInIcon style={styles.icon} color={green700}/>
            <br />
            <br />
            <label>Logged into <a href="#" onClick={this._openCloudLink}>{this.props.settings.cfInstance}</a></label>
            <br />
            <br />
            <br />
            <RaisedButton label="Logout" primary={true} onClick={this._logout}/>
          </div>
        </CardText>
      </Card>
    )
  }
}
