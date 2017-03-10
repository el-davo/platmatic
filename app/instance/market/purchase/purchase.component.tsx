import * as React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';
import {PurchaseBannerImageComponent} from './purchase-banner-image.component';
import {PurchaseBannerDescriptionComponent} from './purchase-banner-description.component';
import {PurchasePlanPriceListComponent} from './purchase-plan-price-list.component';
import {PurchasePlanBulletsComponent} from './purchase-plan-bullets.component';
import {PurchaseSelectSpaceComponent} from './purchase-select-space.component';
import {CloseOverlayButtonComponent} from './close-overlay-button.component';

interface props {
	market: any;
	closePurchasePlans();
	selectPurchasePlan(plan: any);
	showPurchaseSelectSpace();
	hidePurchaseSelectSpace();
	requestFetchPurchaseSpaces();
	requestPurchaseService(name: string, spaceGuid: string, planGuid: string);
}

export class PurchaseComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div>
				<CloseOverlayButtonComponent market={this.props.market}
																		 closePurchasePlans={this.props.closePurchasePlans}/>
				<br/>
				<Grid fluid>
					<Row>
						<Col xs={12} sm={2} md={2}>
							<PurchaseBannerImageComponent market={this.props.market}/>
						</Col>
						<Col xs={12} sm={10} md={10}>
							<PurchaseBannerDescriptionComponent market={this.props.market}/>
						</Col>
					</Row>

					<br/>

					<Row>
						<Col xs={12} sm={4} md={4}>
							<PurchasePlanPriceListComponent market={this.props.market}
																							selectPurchasePlan={this.props.selectPurchasePlan}/>
						</Col>
						<Col xs={12} sm={8} md={8}>
							{
								this.props.market.purchasePlans.selectedPurchasePlan.entity ? (
										this.props.market.purchasePlans.showPurchaseSelectSpace ? (
												<PurchaseSelectSpaceComponent market={this.props.market}
																											hidePurchaseSelectSpace={this.props.hidePurchaseSelectSpace}
																											requestFetchPurchaseSpaces={this.props.requestFetchPurchaseSpaces}
																											requestPurchaseService={this.props.requestPurchaseService}/>
											) : (
												<PurchasePlanBulletsComponent market={this.props.market}
																											showPurchaseSelectSpace={this.props.showPurchaseSelectSpace}/>
											)
									) : (
										<div></div>
									)
							}
						</Col>
					</Row>
				</Grid>
			</div>
		)
	}
}
