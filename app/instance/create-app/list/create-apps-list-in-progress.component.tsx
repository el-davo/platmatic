import * as React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {List} from 'material-ui/List';
import {green600} from 'material-ui/styles/colors';
import InfoIcon from 'material-ui/svg-icons/action/info-outline';
import ToggleDisplay from 'react-toggle-display';
import {CreateAppProgressComponent} from './create-app-progress.component';

const styles = {
	empty: {
		textAlign: 'center'
	},
	infoIcon: {
		height: 50,
		width: 50
	}
};

interface props {
	createApp: any
}

export class CreateAppsListInProgressComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<Card initiallyExpanded={true}>
				<CardHeader
					title="In Progress"
					actAsExpander={true}
					showExpandableButton={true}
				/>
				<CardText expandable={true}>
					<ToggleDisplay if={Object.keys(this.props.createApp.initializing).length > 0}>
						<List>
							{Object.keys(this.props.createApp.initializing).map(key => {
								return <CreateAppProgressComponent key={key} app={this.props.createApp.initializing[key]}/>
							})}
						</List>
					</ToggleDisplay>
					<ToggleDisplay if={Object.keys(this.props.createApp.initializing).length === 0}>
						<div style={styles.empty}>
							<InfoIcon color={green600} style={styles.infoIcon}/>
							<br/>
							<br/>
							<div>No uploads in progress</div>
						</div>
					</ToggleDisplay>
				</CardText>
			</Card>
		)
	}
}
