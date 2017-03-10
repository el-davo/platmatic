import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SearchComponent} from './search.component';
import * as actions from './search.actions';

export const SearchContainer = (props) => {
	return (
		<SearchComponent search={props.search}
										 showSearchOverlay={props.actions.showSearchOverlay}
										 requestSearchCache={props.actions.requestSearchCache}/>
	);
};

function mapStateToProps(state) {
	return {
		search: state.search
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
)(SearchContainer);
