import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {BreadcrumbComponent} from '../../common/breadcrumb.component';
import {MarketComponent} from './market.component';
import * as actions from './market.actions';

export const MarketContainer = (props) => {

	return (
		<div>
			<BreadcrumbComponent routes={props.routes}/>

			<MarketComponent market={props.market}
											 fetchMarketAssets={props.actions.fetchMarketAssets}
											 clearMarketAssets={props.actions.clearMarketAssets}
											 requestFetchPurchasePlans={props.actions.requestFetchPurchasePlans}/>
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
)(MarketContainer);
