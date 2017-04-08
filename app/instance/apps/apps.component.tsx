import * as React from 'react';
import {Link} from 'react-router';
import {Card, CardText} from 'material-ui/Card';
import {Table, Column, Cell} from 'fixed-data-table-2';
import {green600, red600} from 'material-ui/styles/colors';
import StatusIcon from 'material-ui/svg-icons/av/fiber-manual-record';
import AppsPaginationContainer from './apps-pagination.container';
import AppOptionsContainer from './app-options.container';
import {LoadingComponent} from '../../common/loading.component';
import {AppsEmptyComponent} from './apps-empty.component';

const styles = {
	status: {
		marginLeft: 20,
		marginTop: 3
	}
};

interface props {
	organization_guid: string;
	space_guid: string;
	apps: any;
	settings: any;
	fetchApps(space_guid: string);
	clearApps();
}

export class AppsComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);

		this.state = {
			tableWidth: 800,
			confirmStopDialogOpen: false
		};

		this._handleResize = this._handleResize.bind(this);
	}

	componentDidMount() {
		this._getData();
		window.addEventListener('resize', this._handleResize);

		let intervalId = setInterval(() => this._getData(), 5000);

		this._setTableWidth();

		this.setState({intervalId: intervalId});
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this._handleResize);
		clearInterval(this.state.intervalId);
		this.props.clearApps();
	}

	_handleResize() {
		this.setState({tableWidth: document.getElementById('table-container').offsetWidth - 30});
	}

	_setTableWidth() {
		this.setState({tableWidth: document.getElementById('table-container').offsetWidth - 30});
	}

	_getData() {
		this.props.fetchApps(this.props.space_guid);
	}

	render() {
		return (
			<Card>
				<CardText id="table-container" style={{ height: 525 }}>
					{
						this.props.apps.result.resources.length > 0 ? (
								<Table
									rowsCount={this.props.apps.result.resources.length}
									rowHeight={30}
									headerHeight={30}
									width={this.state.tableWidth}
									height={450}>
									<Column
										header={<Cell>State</Cell>}
										cell={props => (
										<StatusIcon style={styles.status}
											color={this.props.apps.result.resources[props.rowIndex].entity.state === 'STARTED' ? green600 : red600} />
									)}
										width={75}
									/>
									<Column
										header={<Cell>Name</Cell>}
										cell={props => (
										<Cell {...props}>
													<Link
														to={`/organizations/${this.props.organization_guid}/spaces/${this.props.space_guid}/apps/${this.props.apps.result.resources[props.rowIndex].metadata.guid}/stats`}>
														{this.props.apps.result.resources[props.rowIndex].entity.name}
													</Link>
										</Cell>
									)}
										width={100}
										flexGrow={2}
									/>
									<Column
										header={<Cell>Buildpack</Cell>}
										cell={props => (
										<Cell {...props}>
											{this.props.apps.result.resources[props.rowIndex].entity.buildpack || this.props.apps.result.resources[props.rowIndex].entity.detected_buildpack}
										</Cell>
									)}
										width={100}
										flexGrow={2}
									/>
									<Column
										header={<Cell>Instances</Cell>}
										cell={props => (
										<Cell {...props}>
											{this.props.apps.result.resources[props.rowIndex].entity.instances}
										</Cell>
									)}
										width={100}
									/>
									<Column
										header={<Cell></Cell>}
										cell={props => (
										<AppOptionsContainer app={this.props.apps.result.resources[props.rowIndex]} />
									)}
										width={50}
									/>
								</Table>
							) : (
								<div style={{ height: 450, textAlign: 'center' }}>
									{
										this.props.apps.isFetchingApps ? (
												<LoadingComponent />
											) : (
												<AppsEmptyComponent />
											)
									}
								</div>
							)
					}
					<br />

					<AppsPaginationContainer space_guid={this.props.space_guid}/>
				</CardText>
			</Card>
		)
	}
}
