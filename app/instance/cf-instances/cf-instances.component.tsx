import * as React from 'React';
import {CfInstancesState} from "./cf-instances.state";
import {CfInstanceCard} from './list/cf-instance-card.component';

interface Props {
	cfInstances: CfInstancesState;
	fetchCfInstances();
}

export class CfInstancesComponent extends React.Component<Props, any> {

	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		this.props.fetchCfInstances();
	}

	render() {
		return (
			<div>
				{
					Object.keys(this.props.cfInstances.instances).map(key => {
						return <CfInstanceCard
							key={key}
							instance={this.props.cfInstances.instances[key]}/>
					})
				}
			</div>
		)
	}
}
