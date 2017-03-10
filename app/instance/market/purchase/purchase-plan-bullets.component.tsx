import * as React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

const style = {
	bullets: {
		maxHeight: '50vh',
		overflowY: 'auto',
		overflowX: 'hidden'
	}
};

interface props {
	market: any;
	showPurchaseSelectSpace();
}

export class PurchasePlanBulletsComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<Card>
				<CardHeader
					title={JSON.parse(this.props.market.purchasePlans.selectedPurchasePlan.entity.extra).displayName}
				/>
				<CardText>
					<ul style={style.bullets} className="fancy-scrollbar">
						{
							JSON.parse(this.props.market.purchasePlans.selectedPurchasePlan.entity.extra).bullets.map((bullet, key) => {
								return typeof bullet === 'object' ? <li key={key}>{bullet.content}</li> : <li key={key}>{bullet}</li>;
							})
						}
					</ul>
				</CardText>
				<CardActions>
					<FlatButton label="Select this plan"
											primary={true}
											onClick={() => this.props.showPurchaseSelectSpace()}/>
				</CardActions>
			</Card>
		)
	}
}
