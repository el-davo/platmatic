import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';

const styles = {
	options: {
		marginLeft: 0,
		marginTop: -8,
		cursor: 'pointer'
	}
};

interface props {
	app: any;
	startApp(app: any);
	stopApp(app: any);
	requestLoginSSH(appGuid: any, instance: number);
	requestLogStream(app: any);
	requestDeleteApp(app: any);
}

export class AppOptionsComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);

		this.state = {
			confirmStartDialogOpen: false,
			confirmStopDialogOpen: false,
			deleteAppModalOpen: false
		};

		this._openConfirmStartDialog = this._openConfirmStartDialog.bind(this);
		this._openConfirmStopDialog = this._openConfirmStopDialog.bind(this);
		this._openDeleteAppModal = this._openDeleteAppModal.bind(this);
		this._closeConfirmStartDialog = this._closeConfirmStartDialog.bind(this);
		this._closeConfirmStopDialog = this._closeConfirmStopDialog.bind(this);
		this._closeDeleteAppModal = this._closeDeleteAppModal.bind(this);
		this._startApp = this._startApp.bind(this);
		this._stopApp = this._stopApp.bind(this);
		this._startSshSession = this._startSshSession.bind(this);
		this._openLogs = this._openLogs.bind(this);
		this._deleteApp = this._deleteApp.bind(this);
	}

	_openConfirmStartDialog() {
		this.setState({confirmStartDialogOpen: true});
	}

	_openConfirmStopDialog() {
		this.setState({confirmStopDialogOpen: true});
	}

	_openDeleteAppModal() {
		this.setState({deleteAppModalOpen: true});
	}

	_closeConfirmStartDialog() {
		this.setState({confirmStartDialogOpen: false});
	}

	_closeConfirmStopDialog() {
		this.setState({confirmStopDialogOpen: false});
	}

	_closeDeleteAppModal() {
		this.setState({deleteAppModalOpen: false});
	}

	_startApp() {
		this.props.startApp(this.props.app.metadata.guid);
		this.setState({confirmStartDialogOpen: false});
	}

	_stopApp() {
		this.props.stopApp(this.props.app.metadata.guid);
		this.setState({confirmStopDialogOpen: false});
	}

	_startSshSession() {
		this.props.requestLoginSSH(this.props.app, 0);
	}

	_openLogs() {
		this.props.requestLogStream(this.props.app);
	}

	_deleteApp() {
		this.props.requestDeleteApp(this.props.app);
		this.setState({deleteAppModalOpen: false});
	}

	render() {

		const confirmStartActions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onTouchTap={this._closeConfirmStartDialog}
			/>,
			<FlatButton
				label="Confirm"
				primary={true}
				onTouchTap={this._startApp}
			/>
		];

		const confirmStopActions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onTouchTap={this._closeConfirmStopDialog}
			/>,
			<FlatButton
				label="Confirm"
				primary={true}
				onTouchTap={this._stopApp}
			/>
		];

		const deleteAppActions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onTouchTap={this._closeDeleteAppModal}
			/>,
			<FlatButton
				label="Confirm"
				primary={true}
				onTouchTap={this._deleteApp}
			/>
		];

		return (
			<div>
				<IconMenu
					style={styles.options}
					iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
					anchorOrigin={{horizontal: 'left', vertical: 'top'}}
					targetOrigin={{horizontal: 'left', vertical: 'top'}}
				>
					{
						this.props.app.entity.state === 'STARTED' ? (
								<MenuItem primaryText="Stop"
													onClick={this._openConfirmStopDialog}/>
							) : (
								<MenuItem primaryText="Start"
													onClick={this._openConfirmStartDialog}/>
							)
					}
					{
						this.props.app.entity.state === 'STARTED' && this.props.app.entity.enable_ssh ? (
								<MenuItem primaryText="SSH"
													onClick={this._startSshSession}/>
							) : (null)
					}
					<MenuItem primaryText="Logs"
										onClick={this._openLogs}/>
					<MenuItem primaryText="Delete"
										onClick={this._openDeleteAppModal}/>
				</IconMenu>

				<Dialog
					title="Alert"
					actions={confirmStartActions}
					modal={false}
					open={this.state.confirmStartDialogOpen}
					onRequestClose={this._closeConfirmStartDialog}
				>
					Are you sure you want to start {this.props.app.entity.name}?
				</Dialog>

				<Dialog
					title="Warning"
					actions={confirmStopActions}
					modal={false}
					open={this.state.confirmStopDialogOpen}
					onRequestClose={this._closeConfirmStopDialog}
				>
					Are you sure you want to stop {this.props.app.entity.name}?
				</Dialog>

				<Dialog
					title="Warning"
					actions={deleteAppActions}
					modal={false}
					open={this.state.deleteAppModalOpen}
					onRequestClose={this._closeDeleteAppModal}
				>
					Are you sure you want to delete {this.props.app.entity.name}?
				</Dialog>
			</div>
		)
	}
}
