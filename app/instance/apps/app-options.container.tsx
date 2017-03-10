import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {AppOptionsComponent} from './app-options.component';
import * as appAction from '../../instance/apps/apps.actions';
import * as sshActions from '../../instance/ssh/ssh.actions';
import * as logsActions from '../../instance/logs/logs.actions';

export const AppOptionsContainer = (props) => {
  return (
    <AppOptionsComponent app={props.app}
                         startApp={props.actions.startApp}
                         stopApp={props.actions.stopApp}
                         requestLoginSSH={props.actions.requestLoginSSH}
                         requestLogStream={props.actions.requestLogStream}
                         requestDeleteApp={props.actions.requestDeleteApp}/>
  );
};

function mapStateToProps(state, myProps) {
  return {
    app: myProps.app
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...appAction, ...sshActions, ...logsActions}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppOptionsContainer);
