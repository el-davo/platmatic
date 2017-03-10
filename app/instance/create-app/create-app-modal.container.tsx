import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {CreateAppModalComponent} from './create-app-modal.component';
import * as actions from './create-app.actions';

export const CreateAppModalContainer = (props) => {
	return (
		<CreateAppModalComponent createApp={props.createApp}
														 requestCreateApp={props.actions.requestCreateApp}
														 hideCreateAppDialog={props.actions.hideCreateAppDialog}
														 requestPopulateCreateAppForm={props.actions.requestPopulateCreateAppForm}/>
	);
};

function mapStateToProps(state) {
	return {
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
)(CreateAppModalContainer);
