import * as React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import StopIcon from 'material-ui/svg-icons/navigation/close';
import {darkWhite, black} from 'material-ui/styles/colors';
import {range} from 'lodash';
import {TerminalComponent} from './terminal/terminal.component';
import {LoadingComponent} from '../../common/loading.component';

const style = {
	container: {
		position: 'absolute',
		height: '100vh',
		width: '100%',
		top: 0,
		left: 0,
		zIndex: 10005,
		backgroundColor: black,
		opacity: 0.9
	},
	terminate: {
		position: 'absolute',
		top: -5,
		right: 5,
		zIndex: 9999
	},
	header: {
		color: darkWhite,
		margin: 10
	},
	closeButton: {
		width: 25,
		height: 25
	},
	instanceSelect: {
		color: darkWhite,
		margin: '0 0 0 20px',
		padding: 0,
		width: 50,
	}
};

interface props {
	ssh: any;
	requestLoginSSH(app, appInstance);
	registerCallbackListener(callback);
	sendCommand(command: string);
	requestChangeInstance(appInstance: number);
	requestLogoutSSH();
}

export class SshComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);

		this._logout = this._logout.bind(this);
		this._handleInstanceChange = this._handleInstanceChange.bind(this);
	}

	_logout() {
		this.props.requestLogoutSSH();
	}

	_handleInstanceChange(event, index, value) {
		this.props.requestChangeInstance(value);
	}

	render() {
		return (
			<div style={style.container}>
				<table style={{height: '100%', width: '100%'}}>
					<tbody>
					<tr style={{height: 10}}>
						<td>
							{
								this.props.ssh.isLoggedIn ? (
										<div>
										<span style={style.header}>
                  		Connected to: {this.props.ssh.app.entity.name}
                		</span>
											{
												this.props.ssh.app.entity.instances > 1 ? (
														<SelectField
															style={style.instanceSelect}
															value={this.props.ssh.appInstance}
															labelStyle={{color: darkWhite}}
															disabled={this.props.ssh.isConnectingToSSH}
															onChange={this._handleInstanceChange}
														>
															{
																range(0, this.props.ssh.app.entity.instances).map(index => {
																	return <MenuItem key={index} value={index} primaryText={index + 1}/>
																})
															}
														</SelectField>
													) : (
														<div />
													)
											}
										</div>
									) : (
										<div />
									)
							}
						</td>
						<td>
							<IconButton style={style.terminate}
													iconStyle={style.closeButton}
													disabled={this.props.ssh.isConnectingToSSH}
													onClick={this._logout}>
								<StopIcon color={darkWhite}/>
							</IconButton>
						</td>
					</tr>
					<tr>
						<td style={{verticalAlign: 'top'}} colSpan={2}>
							{this.props.ssh.isLoggedIn && !this.props.ssh.isConnectingToSSH ? (
									<TerminalComponent ssh={this.props.ssh}
																		 registerCallbackListener={this.props.registerCallbackListener}
																		 sendCommand={this.props.sendCommand}/>
								) : (
									<div style={{height: 200, textAlign: 'center'}}>
										<LoadingComponent />
									</div>
								)}
						</td>
					</tr>
					</tbody>
				</table>
			</div>
		)
	}
}
