import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {LayoutComponent} from './layout.component';
import * as actions from '../settings/settings.actions';

export const LayoutContainer = (props) => {
  return (
    <LayoutComponent settings={props.settings} createApp={props.createApp}>
      {props.children}
    </LayoutComponent>
  );
};

function mapStateToProps(state) {
  return {
    settings: state.settings,
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
)(LayoutContainer);
