import * as React from 'react';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import {LoadingComponent} from '../../../common/loading.component';

interface props {
	market: any;
	hidePurchaseSelectSpace();
	requestFetchPurchaseSpaces();
	requestPurchaseService(name: string, spaceGuid: string, planGuid: string);
}

export class PurchaseSelectSpaceComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);

		this.state = {
			form: {
				name: '',
				space: ''
			}
		};

		this._handleUpdateName = this._handleUpdateName.bind(this);
		this._handleUpdateSpace = this._handleUpdateSpace.bind(this);
		this._handlePurchase = this._handlePurchase.bind(this);
	}

	componentDidMount() {
		this.props.requestFetchPurchaseSpaces();
	}

	_handleUpdateName({target: {value}}) {
		this.setState({form: {...this.state.form, name: value}});
	}

	_handleUpdateSpace(event, index, value) {
		this.setState({form: {...this.state.form, space: value}});
	}

	_handlePurchase() {
		this.props.requestPurchaseService(this.state.form.name,
			this.state.form.space,
			this.props.market.purchasePlans.selectedPurchasePlan.metadata.guid);
	}

	render() {
		return (
			<Card>
				<CardHeader
					title={`Configure ${JSON.parse(this.props.market.purchasePlans.selectedPurchasePlan.entity.extra).displayName}`}
				/>
				<CardText>
					{
						!this.props.market.purchasePlans.isFetchingSpaces ? (
								<div>
									<TextField
										floatingLabelText="Name"
										value={this.state.form.name}
										fullWidth={true}
										onChange={this._handleUpdateName}
									/>
									<SelectField floatingLabelText="Space"
															 value={this.state.form.space}
															 onChange={this._handleUpdateSpace}
															 fullWidth={true}>
										{
											this.props.market.purchasePlans.spaces.map((organization, key1) => {
												return organization.spaces.map((space, key2) => {
													return <MenuItem key={`${key1}${key2}`}
																					 value={space.guid}
																					 primaryText={`(${organization.organization.entity.name}) ${space.name}`}/>
												});
											})
										}
									</SelectField>
								</div>
							) : (
								<div style={{height: 183, textAlign: 'center'}}>
									<LoadingComponent />
								</div>
							)
					}
				</CardText>
				<CardActions>
					{
						!this.props.market.purchasePlans.isFetchingSpaces ? (
								<div>
									<FlatButton label="Cancel"
															secondary={true}
															onClick={() => this.props.hidePurchaseSelectSpace()}/>
									<FlatButton label="Purchase"
															primary={true}
															disabled={this.state.form.space.length === 0 || this.state.form.name.length === 0}
															onClick={this._handlePurchase}/>
								</div>
							) : (
								<div />
							)
					}
				</CardActions>
			</Card>
		)
	}
}
