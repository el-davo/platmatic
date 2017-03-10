import * as React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Chip from 'material-ui/Chip';

const styles = {
	chip: {
		margin: 4
	},
	wrapper: {
		display: 'flex',
		flexWrap: 'wrap'
	}
};

interface props {
	ports: Array<any>
}

export class PortsCardComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<Card initiallyExpanded={false}>
				<CardHeader
					title="Ports"
					actAsExpander={true}
					showExpandableButton={true}
				/>
				<CardText expandable={true}>
					{
						(this.props.ports || []).map((port, index) => {
							return <div key={index} style={styles.wrapper}>
								<Chip style={styles.chip}>
									{port}
								</Chip>
							</div>
						})
					}
				</CardText>
			</Card>
		)
	}
}
