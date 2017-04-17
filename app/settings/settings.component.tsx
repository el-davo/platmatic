import * as React from 'react';
import {SettingsState} from "./settings.state";
import {InstanceListComponent} from './instances/instance-list.component';

interface Props {
	settings: SettingsState
}

export class SettingsComponent extends React.Component<Props, any> {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<InstanceListComponent settings={this.props.settings}/>
		)
	}
}
