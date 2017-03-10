import * as React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import JSONTree from 'react-json-tree'

interface props {
	appGuid: string;
	environmentVariables: any;
}

export class SystemEnvironmentVariablesCardComponent extends React.Component<props, any> {

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
					title="System Environment Variables"
					actAsExpander={true}
					showExpandableButton={true}
				/>
				<CardText expandable={true}>
					<JSONTree hideRoot={true} 
					data={(this.props.environmentVariables.application_env_json || {})}
					shouldExpandNode={() => true}/>
				</CardText>
			</Card>
		)
	}
}

