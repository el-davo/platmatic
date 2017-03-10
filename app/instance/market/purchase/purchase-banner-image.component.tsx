import * as React from 'react';
import Avatar from 'material-ui/Avatar';

const DEFAULT_IMAGE = './img/default-services-image.png';

interface props {
	market: any
}

export class PurchaseBannerImageComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);

		this._onImageError = this._onImageError.bind(this);
	}

	_onImageError(e) {
		e.target.src = DEFAULT_IMAGE;
	}

	render() {
		return (
			<Avatar size={100}
							src={(JSON.parse(this.props.market.purchasePlans.service.entity.extra) || {}).imageUrl || DEFAULT_IMAGE}
							onError={this._onImageError}/>
		)
	}
}
