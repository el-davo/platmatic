import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {BreadcrumbComponent} from '../common/breadcrumb.component';
import {SettingsComponent} from './settings.component';
import {SettingsState} from "./settings.state";

interface Props {
	routes: any,
	settings: SettingsState
}

export const SettingsContainer = (props: Props) => {

	return (
		<div>
			<BreadcrumbComponent routes={props.routes}/>

			<SettingsComponent settings={props.settings}/>
		</div>
	);
};

function mapStateToProps(state, ownProps) {
	return {
		routes: ownProps.routes,
		settings: state.settings
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({}, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SettingsContainer);
