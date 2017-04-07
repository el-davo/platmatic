import * as React from 'react';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import {green600, red600} from 'material-ui/styles/colors';
import StatusIcon from 'material-ui/svg-icons/av/fiber-manual-record';
import MemoryIcon from 'material-ui/svg-icons/hardware/memory';
import BuildPackIcon from 'material-ui/svg-icons/hardware/developer-board';
import FlatButton from 'material-ui/FlatButton';
import {appStatsState} from './app-stats.state';
import {ScaleModalComponent} from './scale/scale-modal.component';

interface props {
	appStats: appStatsState;
	openScaleDialog();
	closeScaleDialog();
	requestScaleApp(guid: string, instances: number, memory: number, disk: number);
	requestLoginSSH(app: any, appInstance: number);
}

export class AppStatsCardComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);

		this._openScaleModal = this._openScaleModal.bind(this);
		this._requestLoginSSH = this._requestLoginSSH.bind(this);
	}

	_openScaleModal() {
		this.props.openScaleDialog();
	}

	_requestLoginSSH() {
		this.props.requestLoginSSH(this.props.appStats.app, 0);
	}

	render() {
		return (
			<Card>
				<CardHeader
					title={this.props.appStats.summary.name}
					subtitle={`${this.props.appStats.summary.instances} Instances`}
					avatar={<StatusIcon
            color={this.props.appStats.summary.state === 'STARTED' ? green600 : red600} />}
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
				</CardActions>
			</Card>
		)
	}
}
