import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {BoundServiceListItemComponent} from './bound-service-list-item.component';

export const BoundServiceListContainer = (props) => {
  return (
    <BoundServiceListItemComponent settings={props.settings}
                                   service={props.service}/>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    settings: state.settings,
    service: ownProps.service
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
)(BoundServiceListContainer);
