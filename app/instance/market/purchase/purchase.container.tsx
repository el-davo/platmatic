import * as React from 'react';
import {connect} from 'react-redux';
import {darkWhite, black} from 'material-ui/styles/colors';
import {bindActionCreators} from 'redux';
import {PurchaseComponent} from './purchase.component';
import {PurchaseCompleteComponent} from './purchase-complete.component';
import {LoadingComponent} from '../../../common/loading.component';
import * as actions from '../market.actions';

const style = {
	container: {
		position: 'fixed',
		height: '100vh',
		width: '100%',
		overflowY: 'scroll',
		top: 0,
		left: 0,
		zIndex: 10005,
		backgroundColor: black,
		opacity: 0.94
	},
	terminate: {
		position: 'absolute',
		top: -5,
		right: 5,
		zIndex: 9999
	},
	header: {
		color: darkWhite,
		margin: 10
	},
	closeButton: {
		width: 25,
		height: 25
	},
	instanceSelect: {
		color: darkWhite,
		margin: '0 0 0 20px',
		padding: 0,
		width: 50,
	}
};

export const PurchaseContainer = (props) => {
	return (
		<div>
			{
				props.market.purchasePlans.showPurchaseOverlay ? (
						<div style={style.container}>
							{
								props.market.purchasePlans.isFetchingPurchaseInfo || props.market.purchasePlans.isPurchasingService ? (
										<div style={{height: 200, textAlign: 'center'}}>
											<LoadingComponent />
										</div>
									) : (
										props.market.purchasePlans.showPurchaseCompleteScreen ? (
												<PurchaseCompleteComponent market={props.market}
																									 closePurchasePlans={props.actions.closePurchasePlans}
																									 hidePurchaseCompleteScreen={props.actions.hidePurchaseCompleteScreen}/>
											) : (
												<PurchaseComponent market={props.market}
																					 closePurchasePlans={props.actions.closePurchasePlans}
																					 selectPurchasePlan={props.actions.selectPurchasePlan}
																					 showPurchaseSelectSpace={props.actions.showPurchaseSelectSpace}
																					 hidePurchaseSelectSpace={props.actions.hidePurchaseSelectSpace}
																					 requestFetchPurchaseSpaces={props.actions.requestFetchPurchaseSpaces}
																					 requestPurchaseService={props.actions.requestPurchaseService}/>
											)
									)
							}
						</div>
					) : (
						<div />
					)
			}
		</div>
	);
};

function mapStateToProps(state, ownProps) {
	return {
		routes: ownProps.routes,
		market: state.market
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({...actions}, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(PurchaseContainer);
