import * as React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import SuccessIcon from 'material-ui/svg-icons/action/check-circle';
import {green600} from 'material-ui/styles/colors';
import {darkWhite} from 'material-ui/styles/colors';
import {CloseOverlayButtonComponent} from './close-overlay-button.component';

const style = {
	container: {
		color: darkWhite,
		textAlign: 'center'
	},
	successIcon: {
		height: 100,
		width: 100
	}
};

interface props {
	market: any;
	closePurchasePlans();
	hidePurchaseCompleteScreen();
}

export class PurchaseCompleteComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);

		this._close = this._close.bind(this);
	}

	_close() {
		this.props.hidePurchaseCompleteScreen();
	}

	render() {
		return (
			<div style={style.container}>

				<CloseOverlayButtonComponent market={this.props.market}
																		 closePurchasePlans={this.props.closePurchasePlans}/>

				<br />
				<br />

				<SuccessIcon style={style.successIcon}
										 color={green600}/>

				<br />
				<br />

				<label>Service has been added</label>

				<br />
				<br />

				<label>We are currently provisioning the service for you. This may take some time based on the service
          type</label>

				<br />
				<br />

				<label>Please feel free to close this screen and we will notify you once your service has been
          provisioned</label>

				<br />
				<br />
				<br />

				<RaisedButton label="Make another purchase"
											primary={true}
											onClick={this._close}/>
			</div>
		)
	}
}
