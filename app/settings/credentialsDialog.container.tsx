import * as React from 'react'
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CredentialsDialogComponent} from './credentialsDialog.component';
import * as actions from './settings.actions';

interface containerProps {
	settings: any;
	actions: Actions;
}

interface Actions {
	requestLogin(cfInstance: string, username: string, password: string);
}

const container: React.StatelessComponent<{}> = (props: containerProps) => {
	return (<CredentialsDialogComponent settings={props.settings}
																			requestLogin={props.actions.requestLogin}/>)
};

function mapStateToProps(state) {
	return {
		settings: state.settings
	};
}

function mapDispatchToProps(dispatch: any): any {
	return {
		actions: bindActionCreators({...actions}, dispatch)
	};
}

export const CredentialsDialogContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(container);
