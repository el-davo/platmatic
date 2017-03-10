import * as React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';
import ToggleDisplay from 'react-toggle-display';

import {SpaceCardComponent} from './space-card.component';
import {LoadingComponent} from '../../common/loading.component';

interface props {
	organization_guid: string;
	spaces: any;
	settings: any;
	fetchSpaces(organization_guid: string);
	clearSpaces();
}

export class SpacesComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);

		this._getData = this._getData.bind(this);
		this._showLoading = this._showLoading.bind(this);
	}

	componentDidMount() {
		this._getData();

		let intervalId = setInterval(() => this._getData(), 10000);

		this.setState({intervalId: intervalId});
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId);

		this.props.clearSpaces();
	}

	_getData() {
		this.props.fetchSpaces(this.props.organization_guid);
	}

	_showLoading() {
		return this.props.spaces.isFetchingSpaces && this.props.spaces.result.length === 0;
	}

	render() {
		return (
			<div>
				<ToggleDisplay if={!this._showLoading()}>
					<Grid fluid style={{paddingLeft: 0}}>
						<Row>
							{this.props.spaces.result.map((space, index) => {
								return <Col xs={12} sm={6} md={4} key={index}>
									<SpaceCardComponent organization_guid={this.props.organization_guid} space={space}/>
									<br />
								</Col>
							})}
						</Row>
					</Grid>
				</ToggleDisplay>
				<ToggleDisplay if={this._showLoading()}>
					<div style={{height: 150, textAlign: 'center'}}>
						<LoadingComponent />
					</div>
				</ToggleDisplay>
			</div>
		)
	}
}
