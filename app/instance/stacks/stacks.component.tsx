import * as React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';

export class StacksComponent extends React.Component<any, any> {

	constructor(props, context) {
		super(props, context);

		this._getData = this._getData.bind(this);
	}

	componentDidMount() {
		this._getData();
	}

	_getData() {
		this.props.fetchStacks();
	}

	render() {
		return (
			<div>
				{this.props.stacks.result.map((stack, index) => {
					return <div key={index}>
						<Card initiallyExpanded={true}>
							<CardHeader
								title={stack.entity.name}
								actAsExpander={true}
								showExpandableButton={true}
							/>
							<CardText expandable={true}>
								{stack.entity.description}
							</CardText>
						</Card>
						<br />
					</div>
				})}
			</div>
		)
	}
}
