import * as React from 'react';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import {darkWhite} from 'material-ui/styles/colors';

const style = {
	terminate: {
		position: 'absolute',
		top: -5,
		right: 5,
		zIndex: 9999
	},
	closeButton: {
		width: 25,
		height: 25
	}
};

interface props {
	market: any;
	closePurchasePlans();
}

export class CloseOverlayButtonComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);

		this._close = this._close.bind(this);
	}

	_close() {
		this.props.closePurchasePlans();
	}

	render() {
		return (
			<IconButton style={style.terminate}
									iconStyle={style.closeButton}
									disabled={this.props.market.purchasePlans.isFetchingPurchaseInfo}
									onClick={this._close}>
				<CloseIcon color={darkWhite}/>
			</IconButton>
		)
	}
}
