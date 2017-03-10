import * as React from 'react';
import Avatar from 'material-ui/Avatar';
import {Card, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import {LoadingComponent} from '../../common/loading.component';

const DEFAULT_IMAGE = './img/default-services-image.png';

interface props {
	market: any;
	fetchMarketAssets(page: number);
	clearMarketAssets();
	requestFetchPurchasePlans(service: any, page?: number);
}

export class MarketComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);

		this._onImageError = this._onImageError.bind(this);
	}

	componentDidMount() {
		this._getData(this.props.market.page);
	}

	componentWillUnmount() {
		this.props.clearMarketAssets();
	}

	_getData(page) {
		this.props.fetchMarketAssets(page);
	}

	_onImageError(e) {
		e.target.src = DEFAULT_IMAGE;
	}

	render() {
		return (
			<div>
				{
					this.props.market.assets.length > 0 ? (
							<Card>
								<CardText>
									<List>
										{this.props.market.assets.map((service, index) => {
											return <ListItem
												key={index}
												primaryText={service.entity.label}
												leftAvatar={<Avatar onError={this._onImageError} src={(JSON.parse(service.entity.extra) || {}).imageUrl || DEFAULT_IMAGE}/>}
												secondaryText={service.entity.description}
												onClick={() => this.props.requestFetchPurchasePlans(service)}
											/>
										})}
									</List>
								</CardText>
							</Card>
						) : (
							<div style={{height: 150, textAlign: 'center'}}>
								<LoadingComponent />
							</div>
						)
				}
			</div>
		)
	}
}
