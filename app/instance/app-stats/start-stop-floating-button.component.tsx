import * as React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import StartIcon from 'material-ui/svg-icons/av/play-arrow';
import StopIcon from 'material-ui/svg-icons/av/pause';
import ToggleDisplay from 'react-toggle-display';

const style = {
	button: {
		position: 'fixed',
		bottom: 10,
		right: 10
	}
};

interface props {
	guid: string;
	appStats: any;
	startApp(app: any);
	stopApp(app: any);
}

export class StartStopFloatingButtonComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);

		this._startApp = this._startApp.bind(this);
		this._stopApp = this._stopApp.bind(this);
	}

	_startApp() {
		this.props.startApp(this.props.guid);
	}

	_stopApp() {
		this.props.stopApp(this.props.guid);
	}

	render() {
		return (
			<div>
				<ToggleDisplay if={(this.props.appStats.summary || {}).state !== 'STARTED'}>
					<FloatingActionButton style={style.button} onClick={this._startApp}>
						<StartIcon />
					</FloatingActionButton>
				</ToggleDisplay>

				<ToggleDisplay if={(this.props.appStats.summary || {}).state === 'STARTED'}>
					<FloatingActionButton style={style.button} onClick={this._stopApp}>
						<StopIcon />
					</FloatingActionButton>
				</ToggleDisplay>
			</div>
		)
	}
}
