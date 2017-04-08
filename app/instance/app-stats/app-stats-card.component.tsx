import * as React from 'react';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import {green600, red600} from 'material-ui/styles/colors';
import StatusIcon from 'material-ui/svg-icons/av/fiber-manual-record';
import MemoryIcon from 'material-ui/svg-icons/hardware/memory';
import BuildPackIcon from 'material-ui/svg-icons/hardware/developer-board';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import {appStatsState} from './app-stats.state';
import {ScaleModalComponent} from './scale/scale-modal.component';
import {App} from '../../cloud/apps/app.interface';

interface props {
	appStats: appStatsState;
	openScaleDialog();
	closeScaleDialog();
	requestScaleApp(guid: string, instances: number, memory: number, disk: number);
	requestLoginSSH(app: App, appInstance: number);
	requestLogStream(app: App);
	startApp(guid: string);
	stopApp(guid: string);
}

export class AppStatsCardComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);

		this.state = {
			confirmStartDialogOpen: false,
			confirmStopDialogOpen: false
		};

		this._openScaleModal = this._openScaleModal.bind(this);
		this._requestLoginSSH = this._requestLoginSSH.bind(this);
		this._requestLogStream = this._requestLogStream.bind(this);
		this._openConfirmStartDialog = this._openConfirmStartDialog.bind(this);
		this._openConfirmStopDialog = this._openConfirmStopDialog.bind(this);
		this._closeConfirmStartDialog = this._closeConfirmStartDialog.bind(this);
		this._closeConfirmStopDialog = this._closeConfirmStopDialog.bind(this);
		this._startApp = this._startApp.bind(this);
		this._stopApp = this._stopApp.bind(this);
	}

	_openScaleModal() {
		this.props.openScaleDialog();
	}

	_requestLoginSSH() {
		this.props.requestLoginSSH(this.props.appStats.app, 0);
	}

	_requestLogStream() {
		this.props.requestLogStream(this.props.appStats.app);
	}

	_openConfirmStartDialog() {
		this.setState({confirmStartDialogOpen: true});
	}

	_openConfirmStopDialog() {
		this.setState({confirmStopDialogOpen: true});
	}

	_closeConfirmStartDialog() {
		this.setState({confirmStartDialogOpen: false});
	}

	_closeConfirmStopDialog() {
		this.setState({confirmStopDialogOpen: false});
	}

	_startApp() {
		this.props.startApp(this.props.appStats.app.metadata.guid);
		this.setState({confirmStartDialogOpen: false});
	}

	_stopApp() {
		this.props.stopApp(this.props.appStats.app.metadata.guid);
		this.setState({confirmStopDialogOpen: false});
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

		return (
			<div>
				<Card>
					<CardHeader
						title={this.props.appStats.summary.name}
						subtitle={`${this.props.appStats.summary.instances} Instances`}
						avatar={<StatusIcon
            color={this.props.appStats.app.entity.state === 'STARTED' ? green600 : red600} />}
					/>
					<CardText>
						<List>
							<ListItem
								disabled={true}
								primaryText={this.props.appStats.summary.memory}
								secondaryText="Memory"
								leftIcon={<MemoryIcon />}
							/>
							<ListItem
								disabled={true}
								primaryText={this.props.appStats.summary.buildpack || this.props.appStats.summary.detected_buildpack}
								secondaryText="Buildpack"
								leftIcon={<BuildPackIcon />}
							/>
						</List>

						<ScaleModalComponent appStats={this.props.appStats}
																 closeScaleDialog={this.props.closeScaleDialog}
																 requestScaleApp={this.props.requestScaleApp}/>
					</CardText>
					<CardActions>
						<FlatButton primary={true} label="Scale" onTouchTap={this._openScaleModal}/>
						<FlatButton primary={true} label="SSH" onTouchTap={this._requestLoginSSH}/>
						<FlatButton primary={true} label="Logs" onTouchTap={this._requestLogStream}/>
						{
							this.props.appStats.app.entity.state === 'STARTED' ? (
									<FlatButton primary={true} label="Stop" onTouchTap={this._openConfirmStopDialog}/>
								) : (
									<FlatButton primary={true} label="Start" onTouchTap={this._openConfirmStartDialog}/>
								)
						}
					</CardActions>
				</Card>

				<Dialog
					title="Alert"
					actions={confirmStartActions}
					modal={false}
					open={this.state.confirmStartDialogOpen}
					onRequestClose={this._closeConfirmStartDialog}
				>
					Are you sure you want to start {this.props.appStats.app.entity.name}?
				</Dialog>

				<Dialog
					title="Warning"
					actions={confirmStopActions}
					modal={false}
					open={this.state.confirmStopDialogOpen}
					onRequestClose={this._closeConfirmStopDialog}
				>
					Are you sure you want to stop {this.props.appStats.app.entity.name}?
				</Dialog>
			</div>
		)
	}
}
