import * as React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';

interface props {
	appGuid: string;
	environmentVariables: any;
}

export class UserEnvironmentVariablesCardComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);
	}

	shouldComponentUpdate() {
		return false;
	}

	render() {
		return (
			<Card initiallyExpanded={false}>
				<CardHeader
					title="User Defined Environment Variables"
					actAsExpander={true}
					showExpandableButton={true}
				/>
				<CardText expandable={true}>
					<List>
						{
							Object.keys((this.props.environmentVariables.environment_json || {})).map((key, index) => {
								return <ListItem key={index}
																 disabled={true}
																 primaryText={this.props.environmentVariables.environment_json[key]}
																 secondaryText={key}/>
							})
						}
					</List>
				</CardText>
			</Card>
		)
	}
}
