import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import ToggleDisplay from 'react-toggle-display';
import {LoadingComponent} from '../common/loading.component';

const ERROR_CF_INSTANCE_REQUIRED = 'Cloud Foundry instance is required';
const ERROR_USERNAME_REQUIRED = 'Username is required';
const ERROR_PASSWORD_REQUIRED = 'Password is required';

const styles = {
	dialog: {},
	dialogInputs: {
		width: '100%',
		marginBottom: -4
	}
};

export class CredentialsDialogComponent extends React.Component<any, any> {

	constructor(props, context) {
		super(props, context);

		this.state = {
			cfInstance: 'https://api.run.pivotal.io',
			username: '',
			password: '',
			errorCfInstance: '',
			errorUsername: '',
			errorPassword: ''
		};

		this._handleUpdateCfInstance = this._handleUpdateCfInstance.bind(this);
		this._handleUpdateUsername = this._handleUpdateUsername.bind(this);
		this._handleUpdatePassword = this._handleUpdatePassword.bind(this);
		this._handleKeyPress = this._handleKeyPress.bind(this);
	}

	_handleSubmit = () => {
		this.props.requestLogin(this.state.cfInstance, this.state.username, this.state.password);
	};

	_handleUpdateCfInstance(event) {
		this.setState({cfInstance: event.target.value});
		this.setState({errorCfInstance: event.target.value.length === 0 ? ERROR_CF_INSTANCE_REQUIRED : ''});
	}

	_handleUpdateUsername(event) {
		this.setState({username: event.target.value});
		this.setState({errorUsername: event.target.value.length === 0 ? ERROR_USERNAME_REQUIRED : ''});
	}

	_handleUpdatePassword(event) {
		this.setState({password: event.target.value});
		this.setState({errorPassword: event.target.value.length === 0 ? ERROR_PASSWORD_REQUIRED : ''});
	}

	_isSubmitDisabled() {
		return this.state.cfInstance.length === 0 ||
			this.state.username.length === 0 ||
			this.state.password.length === 0 ||
			this.props.settings.isLoggingIn;
	}

	_handleKeyPress(event) {
		if (event.key !== 'Enter' || this._isSubmitDisabled()) {
			return;
		}

		this._handleSubmit();
	}

	render() {
		const actions = [
			<FlatButton
				label="Submit"
				primary={true}
				keyboardFocused={true}
				onTouchTap={this._handleSubmit}
				disabled={this._isSubmitDisabled()}
			/>
		];

		return (
			<Dialog
				style={styles.dialog}
				title="Cloud Foundry Login"
				modal={false}
				actions={actions}
				open={(!this.props.settings.isLoggedIn || this.props.settings.loginFailed)
        && !this.props.settings.isReadingSettings
        && !this.props.settings.isRefreshingToken}
			>
				<ToggleDisplay show={!this.props.settings.isLoggingIn}>

					<TextField
						onKeyPress={this._handleKeyPress}
						style={styles.dialogInputs}
						value={this.state.cfInstance}
						onChange={this._handleUpdateCfInstance}
						errorText={this.state.errorCfInstance}
						floatingLabelText="Cloud Foundry Instance"
					/>
					<TextField
						onKeyPress={this._handleKeyPress}
						style={styles.dialogInputs}
						value={this.state.username}
						onChange={this._handleUpdateUsername}
						errorText={this.state.errorUsername}
						floatingLabelText="Username"
					/>
					<TextField
						onKeyPress={this._handleKeyPress}
						style={styles.dialogInputs}
						value={this.state.password}
						onChange={this._handleUpdatePassword}
						errorText={this.state.errorPassword}
						type="password"
						floatingLabelText="Password"
					/>
				</ToggleDisplay>
				<ToggleDisplay show={this.props.settings.isLoggingIn}>
					<div style={{height: 205, textAlign: 'center'}}>
						<LoadingComponent />
					</div>
				</ToggleDisplay>
			</Dialog>
		)
	}
}
