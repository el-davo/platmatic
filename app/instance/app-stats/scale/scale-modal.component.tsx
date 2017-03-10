import * as React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { LoadingComponent } from '../../../common/loading.component';
import { appStatsState } from '../app-stats.state';

interface props {
	appStats: appStatsState;
	closeScaleDialog();
	requestScaleApp(guid: string, instances: number, memory: number, disk: number);
}

export class ScaleModalComponent extends React.Component<props, any> {

	state = {
		instances: 0,
		memory: 0,
		disk: 0
	}

	constructor(props, context) {
		super(props, context);

		this._handleClose = this._handleClose.bind(this);
		this._scaleApp = this._scaleApp.bind(this);
		this._handleUpdateInstances = this._handleUpdateInstances.bind(this);
		this._handleUpdateMemory = this._handleUpdateMemory.bind(this);
		this._handleUpdateDisk = this._handleUpdateDisk.bind(this);
	}

	componentDidMount() {
		this._setDefaults();
	}

	_setDefaults() {
		this.state.instances = this.props.appStats.summary.instances;
		this.state.memory = this.props.appStats.summary.memory;
		this.state.disk = this.props.appStats.summary.disk_quota;
	}

	_handleClose() {
		this._setDefaults();
		this.props.closeScaleDialog();
	}

	_scaleApp() {
		this.props.requestScaleApp(this.props.appStats.summary.guid, this.state.instances, this.state.memory, this.state.disk);
	}

	_handleUpdateInstances({target: {value}}) {
		this.setState({ ...this.state, instances: value.replace(/[^0-9.]+/g, '') });
	}

	_handleUpdateMemory({target: {value}}) {
		this.setState({ ...this.state, memory: value.replace(/[^0-9.]+/g, '') });
	}

	_handleUpdateDisk({target: {value}}) {
		this.setState({ ...this.state, disk: value.replace(/[^0-9.]+/g, '') });
	}

	_isSubmitEnabled() {
		return (this.state.instances > 0 && this.state.memory > 0 && this.state.disk > 0) && !this.props.appStats.isScalingApp;
	}

	render() {
		const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onTouchTap={this._handleClose}
			/>,
			<FlatButton
				label="Scale"
				primary={true}
				onTouchTap={this._scaleApp}
				disabled={!this._isSubmitEnabled()}
			/>
		];

		return (
			<div>
				<Dialog
					title="Scale App"
					actions={actions}
					modal={true}
					open={this.props.appStats.showScaleDialog}
				>
					{
						!this.props.appStats.isScalingApp ? (
							<div>
								<TextField
									fullWidth={true}
									value={this.state.instances}
									onChange={this._handleUpdateInstances}
									floatingLabelText="Instances"
								/>

								<TextField
									fullWidth={true}
									value={this.state.memory}
									onChange={this._handleUpdateMemory}
									floatingLabelText="Memory Limit (MB)"
								/>

								<TextField
									fullWidth={true}
									value={this.state.disk}
									onChange={this._handleUpdateDisk}
									floatingLabelText="Disk Limit (MB)"
								/>
							</div>
						) : (
								<div style={{ height: 205, textAlign: 'center' }}>
									<LoadingComponent />
								</div>
							)
					}
				</Dialog>
			</div>
		)
	}
}

