import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ToggleDisplay from 'react-toggle-display';
import {BreadcrumbComponent} from '../../common/breadcrumb.component';
import {StacksComponent} from './stacks.component';
import {LoadingComponent} from '../../common/loading.component';
import * as actions from './stacks.actions';

export const StacksContainer = (props) => {
	return (
		<div>
			<BreadcrumbComponent routes={props.routes}/>

			<ToggleDisplay show={!props.stacks.isFetchingStacks}>
				<StacksComponent stacks={props.stacks} fetchStacks={props.actions.fetchStacks}/>
			</ToggleDisplay>
			<ToggleDisplay show={props.stacks.isFetchingStacks}>
				<div style={{height: 150, textAlign: 'center'}}>
					<LoadingComponent />
				</div>
			</ToggleDisplay>
		</div>
	);
};

function mapStateToProps(state, ownProps) {
	return {
		routes: ownProps.routes,
		stacks: state.stacks
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
)(StacksContainer);
