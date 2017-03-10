import * as React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

interface props {
	quota: any;
}

export class QuotaCardComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
	}

	render() {
		return (
			<Card>
				<CardHeader
					title="Quota"
				/>
				<CardText>
					Quota
				</CardText>
			</Card>
		)
	}
}
