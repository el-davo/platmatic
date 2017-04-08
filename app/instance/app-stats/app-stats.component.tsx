import * as React from 'react';
import {Grid, Row, Col} from 'react-flexbox-grid/lib/index';
import {LoadingComponent} from '../../common/loading.component';
import {AppStatsCardComponent} from './app-stats-card.component';
import {AppMemoryChartComponent} from './app-memory-chart.component';
import {AppCpuChartComponent} from './app-cpu-chart.component';
import {BoundServicesComponent} from './services/bound-services.component';
import {PortsCardComponent} from './ports/ports-card.component';
import {UserEnvironmentVariablesCardComponent} from './environment-variables/user-environment-variables-card.component';
import {SystemEnvironmentVariablesCardComponent} from './environment-variables/system-environment-variables-card.component';
import {App} from '../../cloud/apps/app.interface';

interface props {
	appStats: any;
	guid: string;
	fetchAppStats(guid: string);
	refreshAppStats(guid: string);
	clearStats();
	openScaleDialog();
	closeScaleDialog();
	requestScaleApp(guid: string, instances: number, memory: number, disk: number);
	requestLoginSSH(app: any, appInstance: number);
	requestLogStream(app: App)
	startApp(guid: string);
	stopApp(guid: string);
}

export class AppStatsComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		this.props.fetchAppStats(this.props.guid);

		let intervalId = setInterval(() => this._refreshData(), 5000);

		this.setState({intervalId: intervalId});
	}

	componentWillUnmount() {
		clearInterval(this.state.intervalId);

		this.props.clearStats();
	}

	_refreshData() {
		this.props.refreshAppStats(this.props.guid);
	}

	render() {
		return (
			<div>
				{
					!this.props.appStats.isFetchingAppStats ? (

							<Grid fluid style={{ padding: 0 }}>
								<Row>
									<Col xs={12} md={12} lg={12}>
										<AppStatsCardComponent appStats={this.props.appStats}
																					 openScaleDialog={this.props.openScaleDialog}
																					 closeScaleDialog={this.props.closeScaleDialog}
																					 requestScaleApp={this.props.requestScaleApp}
																					 requestLoginSSH={this.props.requestLoginSSH}
																					 requestLogStream={this.props.requestLogStream}
																					 startApp={this.props.startApp}
																					 stopApp={this.props.stopApp}/>
									</Col>
								</Row>

								{
									this.props.appStats.app.entity.state === 'STARTED' ? (
											<div>
												<br />

												<Row>
													<Col xs={12} md={12} lg={6}>
														<AppMemoryChartComponent appStats={this.props.appStats}
																										 guid={this.props.guid}/>
														<br />
													</Col>
													<Col xs={12} md={12} lg={6}>
														<AppCpuChartComponent appStats={this.props.appStats}
																									guid={this.props.guid}/>
														<br />
													</Col>
												</Row>

												{
													(this.props.appStats.summary.services || []).length > 0 ? (
															<div>
																<Row>
																	<Col xs={12} md={12} lg={12}>
																		<BoundServicesComponent appStats={this.props.appStats}/>
																	</Col>
																</Row>
																<br />
															</div>
														) : (
															<div />
														)
												}

												<Row>
													<Col xs={12} md={12} lg={12}>
														<UserEnvironmentVariablesCardComponent appGuid={this.props.guid}
																																	 environmentVariables={this.props.appStats.environmentVariables}/>
													</Col>
												</Row>

												<br />

												<Row>
													<Col xs={12} md={12} lg={12}>
														<SystemEnvironmentVariablesCardComponent appGuid={this.props.guid}
																																		 environmentVariables={this.props.appStats.environmentVariables}/>
													</Col>
												</Row>

												<br />

												{
													(this.props.appStats.summary.ports || []).length > 0 ? (
															<div>
																<Row>
																	<Col xs={12} md={12} lg={12}>
																		<PortsCardComponent ports={this.props.appStats.summary.ports || []}/>
																	</Col>
																</Row>

																<br />
															</div>
														) : (
															<div />
														)
												}

												<br />
											</div>
										) : (
											<div />
										)
								}

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
