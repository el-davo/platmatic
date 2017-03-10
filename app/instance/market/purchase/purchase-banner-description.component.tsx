import * as React from 'react';
import {darkWhite} from 'material-ui/styles/colors';

interface props {
	market: any;
}

export class PurchaseBannerDescriptionComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);

		this._getDescription = this._getDescription.bind(this);
	}

	_getDescription() {
		return (JSON.parse(this.props.market.purchasePlans.service.entity.extra) || {}).longDescription || this.props.market.purchasePlans.service.entity.description;
	}

	render() {
		return (
			<div style={{padding: 10}}>
				<label
					style={{color: darkWhite}}>{this._getDescription()}</label>
			</div>
		)
	}
}
