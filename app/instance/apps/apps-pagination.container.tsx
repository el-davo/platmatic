import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {AppsPaginationComponent} from './apps-pagination.component';
import * as actions from '../../instance/apps/apps.actions';

export const AppsPaginationContainer = (props) => {

	return (
		<AppsPaginationComponent apps={props.apps}
														 space_guid={props.space_guid}
														 goToPage={props.actions.goToPage}
														 fetchApps={props.actions.fetchApps}/>
	);
};

function mapStateToProps(state, ownProps) {
	return {
		apps: state.apps,
		space_guid: ownProps.space_guid,
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
)(AppsPaginationContainer);
