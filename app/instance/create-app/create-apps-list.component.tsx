import * as React from 'react';
import ToggleDisplay from 'react-toggle-display';
import {CreateAppsListInProgressComponent} from './list/create-apps-list-in-progress.component';
import {CreateAppsListSuccessComponent} from './list/create-apps-list-success.component';
import {CreateAppsListFailedComponent} from './list/create-apps-list-failed.component';

interface props {
	createApp: any;
}

export class CreateAppsListComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div>
				<CreateAppsListInProgressComponent createApp={this.props.createApp}/>

				<br/>

				<ToggleDisplay if={Object.keys(this.props.createApp.success).length > 0}>
					<CreateAppsListSuccessComponent createApp={this.props.createApp}/>
				</ToggleDisplay>

				<br />

				<ToggleDisplay if={Object.keys(this.props.createApp.failed).length > 0}>
					<CreateAppsListFailedComponent createApp={this.props.createApp}/>
				</ToggleDisplay>
			</div>
		)
	}
}
