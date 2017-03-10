import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CreateAppFloatingButtonComponent} from './create-app-floating-button.component';
import * as actions from '../create-app.actions';

export const CreateAppFloatingButtonContainer = (props) => {
	return (
		<CreateAppFloatingButtonComponent selectTargetDirectory={props.actions.selectTargetDirectory}/>
	);
};

function mapStateToProps() {
	return {};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: bindActionCreators({...actions}, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(CreateAppFloatingButtonContainer);
