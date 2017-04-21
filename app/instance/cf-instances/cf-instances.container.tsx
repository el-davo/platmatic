import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {BreadcrumbComponent} from '../../common/breadcrumb.component';
import {CfInstancesComponent} from './cf-instances.component';
import * as actions from './cf-instances.actions';
import {CfInstancesState} from "./cf-instances.state";

interface Props {
	routes: any;
	cfInstances: CfInstancesState;
	actions: Actions
}

interface Actions {
	fetchCfInstances();
}

export const CfInstancesContainer = (props: Props) => {

	return (
		<div>
			<BreadcrumbComponent routes={props.routes}/>

			<CfInstancesComponent cfInstances={props.cfInstances} fetchCfInstances={props.actions.fetchCfInstances}/>
		</div>
	);
};

function mapStateToProps(state, ownProps) {
	return {
		routes: ownProps.routes,
		organizations: state.organizations
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({...actions}, dispatch)
	};
}

export default connect<{}, {}, any>(
	mapStateToProps,
	mapDispatchToProps
)(CfInstancesContainer);
