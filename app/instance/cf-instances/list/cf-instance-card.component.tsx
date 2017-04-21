import * as React from 'React';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {Instance} from "../cf-instances.state";

interface Props {
	instance: Instance
}

export class CfInstanceCard extends React.Component<Props, any> {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<Card>
				<CardHeader
					title={this.props.instance.cfInstance}/>
				<CardActions>
					<FlatButton label="Market"/>
				</CardActions>
			</Card>
		)
	}
}
