import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {BreadcrumbComponent} from '../../common/breadcrumb.component';
import {AppsComponent} from './apps.component';
import * as actions from '../../instance/apps/apps.actions';

export const AppsContainer = (props) => {

	return (
		<div>
			<BreadcrumbComponent routes={props.routes}
													 params={{organization_guid: props.organization_guid, space_guid: 'Apps'}}/>

			<AppsComponent organization_guid={props.organization_guid}
										 space_guid={props.space_guid}
										 apps={props.apps}
										 settings={props.settings}
										 fetchApps={props.actions.fetchApps}
										 clearApps={props.actions.clearApps}/>
		</div>
	);
};

function mapStateToProps(state, ownProps) {
	return {
		routes: ownProps.routes,
		organization_guid: ownProps.params.organization_guid,
		space_guid: ownProps.params.space_guid,
		apps: state.apps,
		settings: state.settings
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({...actions}, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(AppsContainer);
