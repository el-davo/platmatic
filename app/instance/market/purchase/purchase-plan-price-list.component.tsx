import * as React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';

const style = {
	list: {
		maxHeight: '50vh',
		overflowY: 'auto',
		overflowX: 'hidden'
	}
};

interface props {
	market: any;
	selectPurchasePlan(plan: any);
}

export class PurchasePlanPriceListComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);

		this._selectPurchasePlan = this._selectPurchasePlan.bind(this);
	}

	componentDidMount() {
		this.props.selectPurchasePlan(this.props.market.purchasePlans.plans[0]);
	}

	_selectPurchasePlan(plan) {
		this.props.selectPurchasePlan(plan);
	}

	render() {
		return (
			<Card style={{padding: 0}}>
				<CardHeader
					title="Plans"
				/>
				<CardText style={{padding: 5}}>
					<List style={style.list} className="fancy-scrollbar">
						{
							this.props.market.purchasePlans.plans.map((plan, index) => {
								let extra = JSON.parse(plan.entity.extra);

								let costTemplate = '';

								if (!plan.entity.free) {
									extra.costs.forEach(cost => {
										costTemplate += `$${cost.amount.usd} / ${cost.unit}  `;
									});
								}

								let cost = plan.entity.free ? 'Free' : costTemplate;

								return <ListItem key={index}
																 primaryText={extra.displayName}
																 secondaryText={cost}
																 onClick={() => this._selectPurchasePlan(plan)}/>
							})
						}
					</List>
				</CardText>
			</Card>
		)
	}
}
