import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {AppInitComponent} from './app-init.component';
import * as actions from '../settings/settings.actions';

export const AppInitContainer = (props) => {
	return (
		<AppInitComponent settings={props.settings} requestGetSettings={props.actions.requestGetSettings}/>
	);
};

function mapStateToProps(state) {
	return {
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
)(AppInitContainer);
