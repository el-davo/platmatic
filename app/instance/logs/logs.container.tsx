import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ToggleDisplay from 'react-toggle-display';
import {LogsComponent} from './logs.component';
import * as actions from './logs.actions';

export const LogsContainer = (props) => {

	return (
		<ToggleDisplay if={props.logs.isConnectingToWebSocket || props.logs.isConnectedToWebSocket}>
			<LogsComponent logs={props.logs}
										 registerLogStreamCallback={props.actions.registerLogStreamCallback}
										 requestTerminateLogStream={props.actions.requestTerminateLogStream}/>
		</ToggleDisplay>
	);
};

function mapStateToProps(state) {
	return {
		logs: state.logs
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
)(LogsContainer);
