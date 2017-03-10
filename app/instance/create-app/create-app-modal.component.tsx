import * as React from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import * as uuidV4 from 'uuid/v4';
import {BuildpacksSelectComponent} from './form/buildpacks-select.component';
import {SpaceSelectComponent} from './form/space-select.component';
import {StackSelectComponent} from './form/stack-select.component';
import {DomainSelectComponent} from './form/domains-select.component';

interface props {
	createApp: any;
	requestCreateApp(appId: string, app: any);
	hideCreateAppDialog();
	requestPopulateCreateAppForm();
}

export class CreateAppModalComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);

		this.state = {
			form: {
				name: '',
				memory: 512,
				instances: 1,
				disk_quota: 1024,
				command: '',
				buildpack: '',
				space_guid: '',
				stack_guid: '',
				domain_guid: ''
			}
		};

		this._handleClose = this._handleClose.bind(this);
		this._handleSubmit = this._handleSubmit.bind(this);
		this._handleUpdateName = this._handleUpdateName.bind(this);
		this._handleUpdateMemory = this._handleUpdateMemory.bind(this);
		this._handleUpdateInstances = this._handleUpdateInstances.bind(this);
		this._handleUpdateDiskQuota = this._handleUpdateDiskQuota.bind(this);
		this._handleUpdateStartCommand = this._handleUpdateStartCommand.bind(this);
		this._handleUpdateBuildpack = this._handleUpdateBuildpack.bind(this);
		this._handleUpdateSpace = this._handleUpdateSpace.bind(this);
		this._handleUpdateStack = this._handleUpdateStack.bind(this);
		this._handleUpdateDomain = this._handleUpdateDomain.bind(this);
	}

	componentDidMount() {
		this.props.requestPopulateCreateAppForm();
	}

	_handleClose() {
		this.props.hideCreateAppDialog();
	}

	_handleSubmit() {
		this.props.requestCreateApp(uuidV4(), this.state.form);
		this.props.hideCreateAppDialog();
	}

	_handleUpdateName({target: {value}}) {
		this.setState({form: {...this.state.form, name: value}});
	}

	_handleUpdateMemory({target: {value}}) {
		this.setState({form: {...this.state.form, memory: value}});
	}

	_handleUpdateInstances({target: {value}}) {
		this.setState({form: {...this.state.form, instances: value}});
	}

	_handleUpdateDiskQuota({target: {value}}) {
		this.setState({form: {...this.state.form, disk_quota: value}});
	}

	_handleUpdateStartCommand({target: {value}}) {
		this.setState({form: {...this.state.form, command: value}});
	}

	_handleUpdateBuildpack(buildpack) {
		this.setState({form: {...this.state.form, buildpack}});
	}

	_handleUpdateSpace(space_guid) {
		this.setState({form: {...this.state.form, space_guid}});
	}

	_handleUpdateStack(stack_guid) {
		this.setState({form: {...this.state.form, stack_guid}});
	}

	_handleUpdateDomain(domain_guid) {
		this.setState({form: {...this.state.form, domain_guid}});
	}

	render() {
		const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onTouchTap={this._handleClose}
			/>,
			<FlatButton
				label="Submit"
				primary={true}
				keyboardFocused={true}
				onTouchTap={this._handleSubmit}
			/>
		];

		return (
			<div>
				<Dialog
					title="Create App"
					actions={actions}
					modal={false}
					open={this.props.createApp.showCreateAppDialog}
					onRequestClose={this._handleClose}
					autoScrollBodyContent={true}
				>
					<TextField
						fullWidth={true}
						value={this.state.form.name}
						onChange={this._handleUpdateName}
						floatingLabelText="Name"
					/>
					<TextField
						fullWidth={true}
						value={this.state.form.memory}
						onChange={this._handleUpdateMemory}
						floatingLabelText="Memory (In MB)"
					/>
					<TextField
						fullWidth={true}
						value={this.state.form.instances}
						onChange={this._handleUpdateInstances}
						floatingLabelText="Instances"
					/>
					<TextField
						fullWidth={true}
						value={this.state.form.disk_quota}
						onChange={this._handleUpdateDiskQuota}
						floatingLabelText="Disk Quota (In MB)"
					/>
					<TextField
						fullWidth={true}
						value={this.state.form.command}
						onChange={this._handleUpdateStartCommand}
						floatingLabelText="Start Command"
					/>
					<BuildpacksSelectComponent createApp={this.props.createApp} onChange={this._handleUpdateBuildpack}/>
					<SpaceSelectComponent createApp={this.props.createApp} onChange={this._handleUpdateSpace}/>
					<StackSelectComponent createApp={this.props.createApp} onChange={this._handleUpdateStack}/>
					<DomainSelectComponent createApp={this.props.createApp} onChange={this._handleUpdateDomain}/>
				</Dialog>
			</div>
		)
	}
}
