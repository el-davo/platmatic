import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {BreadcrumbComponent} from '../../common/breadcrumb.component';
import {CreateAppsListComponent} from './create-apps-list.component';
import * as actions from './create-app.actions';

export const CreateAppsListContainer = (props) => {
	return (
		<div>
			<BreadcrumbComponent routes={props.routes}/>

			<CreateAppsListComponent createApp={props.createApp}/>
		</div>
	);
};

function mapStateToProps(state, ownProps) {
	return {
		routes: ownProps.routes,
		createApp: state.createApp
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
)(CreateAppsListContainer);
