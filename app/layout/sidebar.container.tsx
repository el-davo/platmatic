import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SidebarComponent} from './sidebar.component';
import * as events from '../instance/events/events.actions';

export const SidebarContainer = (props) => {
  return (
    <SidebarComponent activePage={props.activePage} fetchEvents={props.actions.fetchEvents}/>
  );
};

function mapStateToProps(state) {
  return {
    activePage: state.activePage
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...events}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SidebarContainer);
