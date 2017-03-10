import * as React from 'react';
import {LoadingComponent} from '../../common/loading.component';
import {ServiceInstancesListComponent} from './service-instances-list.component';

interface props {
	serviceInstances: any;
	space_guid: string;
	fetchServiceInstancesInSpace(space_guid: string, page?: number);
	clearServiceInstances();
}

export class ServiceInstancesComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		this.props.fetchServiceInstancesInSpace(this.props.space_guid);
	}

	componentWillUnmount() {
		this.props.clearServiceInstances();
	}

	render() {
		return (
			<div>
				{
					Object.keys(this.props.serviceInstances.instances).length > 0 ? (
							<ServiceInstancesListComponent serviceInstances={this.props.serviceInstances}/>
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
