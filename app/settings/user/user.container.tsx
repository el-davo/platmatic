import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {UserComponent} from './user.component';
import * as actions from '../settings.actions';

export const UserContainer = (props) => {
  return (
    <UserComponent settings={props.settings} requestLogout={props.actions.requestLogout}/>
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
)(UserContainer);
