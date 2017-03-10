import * as React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {List} from 'material-ui/List';
import BoundServiceListContainer from './bound-service-list-item.container';

interface props {
	appStats: any
}

export class BoundServicesComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<Card initiallyExpanded={false}>
				<CardHeader
					title="Bound Services"
					actAsExpander={true}
					showExpandableButton={true}
				/>
				<CardText expandable={true}>
					<List>
						{
							this.props.appStats.serviceBindings.map((service, index) => {
								return <BoundServiceListContainer key={index} service={service}/>
							})
						}
					</List>
				</CardText>
			</Card>
		)
	}
}
