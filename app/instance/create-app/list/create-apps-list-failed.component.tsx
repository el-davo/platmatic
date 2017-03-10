import * as React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {List} from 'material-ui/List';
import {CreateAppFailedComponent} from './create-app-failed.component';

interface props {
	createApp: any;
}

export class CreateAppsListFailedComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<Card initiallyExpanded={true}>
				<CardHeader
					title="Failed"
					actAsExpander={true}
					showExpandableButton={true}
				/>
				<CardText expandable={true}>
					<List>
						{Object.keys(this.props.createApp.failed).map(key => {
							return <CreateAppFailedComponent key={key} app={this.props.createApp.failed[key]}/>
						})}
					</List>
				</CardText>
			</Card>
		)
	}
}
