import * as React from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ToggleDisplay from 'react-toggle-display';

const DEFAULT_IMAGE = './img/default-services-image.png';

const styles = {
	card: {
		margin: 20
	}
};

interface props {
	search: any;
	requestFetchPurchasePlans(service: any, page?: number);
	hideSearchOverlay()
}

export class MarketResultsComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);

		this._hideSearchOverlay = this._hideSearchOverlay.bind(this);
	}

	_hideSearchOverlay() {
		this.props.hideSearchOverlay();
	}

	_onImageError(e) {
		e.target.src = DEFAULT_IMAGE;
	}

	render() {
		return (
			<ToggleDisplay if={this.props.search.marketResults.length > 0}>
				<Card style={styles.card}>
					<CardTitle title="Market"/>
					<CardText>
						<List>
							{this.props.search.marketResults.map((service, index) => {
								return <ListItem key={index}
																 primaryText={service.entity.label}
																 secondaryText={service.entity.description}
																 onClick={() => this.props.requestFetchPurchasePlans(service)}
																 leftAvatar={<Avatar
                                   src={(JSON.parse(service.entity.extra) || {}).imageUrl || DEFAULT_IMAGE}
                                   onError={this._onImageError}/>}/>
							})}
						</List>
					</CardText>
				</Card>
			</ToggleDisplay>
		)
	}
}
