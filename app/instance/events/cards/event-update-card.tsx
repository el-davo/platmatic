import * as React from 'react';
import ToggleDisplay from 'react-toggle-display';
import {EventUpdatedGenericCardComponent} from "./event-update-cards/event-update-generic-card";
import {EventUpdatedStartedCardComponent} from './event-update-cards/event-update-started-card';
import {EventUpdateStoppedCardComponent} from './event-update-cards/event-update-stopped-card';
import {APP_UPDATED} from '../event-types.constants';

interface props {
	event: any;
}

export class EventUpdateCardComponent extends React.Component<props, any> {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div>
        <ToggleDisplay if={this.props.event.entity.metadata.request.state === 'STARTED'}>
          <EventUpdatedStartedCardComponent event={this.props.event}/>
        </ToggleDisplay>

        <ToggleDisplay if={this.props.event.entity.metadata.request.state === 'STOPPED'}>
          <EventUpdateStoppedCardComponent event={this.props.event}/>
        </ToggleDisplay>

        <ToggleDisplay if={this.props.event.entity.metadata.request.state !== 'STARTED' &&
        this.props.event.entity.metadata.request.state !== 'STOPPED' &&
        this.props.event.entity.type === APP_UPDATED}>
          <EventUpdatedGenericCardComponent event={this.props.event}/>
        </ToggleDisplay>
      </div>
    )
  }
}
