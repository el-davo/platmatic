import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from './events.actions';
import {BreadcrumbComponent} from '../../common/breadcrumb.component';
import {APP_CREATED, APP_UPDATED, APP_DELETED, APP_CRASHED, APP_MAP_ROUTE} from './event-types.constants';
import {EventCreatedCardComponent} from './cards/event-created-card';
import {EventUpdateCardComponent} from './cards/event-update-card';
import {EventDeletedCardComponent} from './cards/event-deleted-card';
import {EventCrashedCardComponent} from './cards/event-crashed-card';
import {EventMapRouteCardComponent} from './cards/event-map-route-card';

export const EventsContainer = (props) => {
  return (
    <div>

      <BreadcrumbComponent routes={props.routes}/>

      {props.events.list.map((event, index) => {
        switch (event.entity.type) {
          case APP_CREATED:
            return <EventCreatedCardComponent key={index} event={event}/>;
          case APP_UPDATED:
            return <EventUpdateCardComponent key={index} event={event}/>;
          case APP_DELETED:
            return <EventDeletedCardComponent key={index} event={event}/>;
          case APP_CRASHED:
            return <EventCrashedCardComponent key={index} event={event}/>;
          case APP_MAP_ROUTE:
            return <EventMapRouteCardComponent key={index} event={event}/>;
        }
      })}
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    routes: ownProps.routes,
    events: state.events
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
)(EventsContainer);
