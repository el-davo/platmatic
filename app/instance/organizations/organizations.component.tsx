import * as React from 'react';
import { Grid, Row, Col} from 'react-flexbox-grid/lib/index';
import { LoadingComponent } from '../../common/loading.component';
import { OrganizationCardComponent } from './organizations-card.component';

interface props {
	organizations: any;
	fetchOrganizations();
	clearOrganizations();
	fetchOrganizationSummary(organization_guid: string)
}

export class OrganizationsComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);

		this._getData = this._getData.bind(this);
		this._showLoading = this._showLoading.bind(this);
	}

	componentDidMount() {
		this._getData();

		let intervalId = setInterval(() => this._getData(), 10000);

		this.setState({ intervalId });
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId);

		this.props.clearOrganizations();
	}

	_getData() {
		this.props.fetchOrganizations();
	}

	_showLoading() {
		return this.props.organizations.isFetchingOrganizations && this.props.organizations.results.length === 0;
	}

	render() {
		return (
			<div>
				{
					!this._showLoading() ? (
						<Grid fluid style={{paddingLeft: 0}}>
							<Row>
								{this.props.organizations.results.map((organization, index) => {
									return <Col xs={12} sm={6} md={4} key={index}>
										<OrganizationCardComponent key={index}
											organizations={this.props.organizations}
											organization={organization}
											fetchOrganizationSummary={this.props.fetchOrganizationSummary} />
										<br />
									</Col>
								})}
							</Row>
						</Grid>
					) : (
							<div style={{ height: 150, textAlign: 'center' }}>
								<LoadingComponent />
							</div>
						)
				}
			</div>
		)
	}
}
