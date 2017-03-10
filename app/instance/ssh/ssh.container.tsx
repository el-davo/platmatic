import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ToggleDisplay from 'react-toggle-display';
import * as actions from './ssh.actions';
import {SshComponent} from './ssh.component';

export const SshContainer = (props) => {
  return (
    <ToggleDisplay if={props.ssh.isConnectingToSSH || props.ssh.isLoggedIn}>
      <SshComponent ssh={props.ssh}
                    requestLoginSSH={props.actions.requestLoginSSH}
                    registerCallbackListener={props.actions.registerCallbackListener}
                    sendCommand={props.actions.sendCommand}
                    requestChangeInstance={props.actions.requestChangeInstance}
                    requestLogoutSSH={props.actions.requestLogoutSSH}/>
    </ToggleDisplay>
  );
};

function mapStateToProps(state) {
  return {
    ssh: state.ssh
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...actions}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SshContainer);
