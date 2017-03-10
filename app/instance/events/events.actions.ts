import {FETCH_EVENTS, CANCEL_EVENTS, UPDATE_EVENTS} from './events.action-types';

export function fetchEvents() {
  return {type: FETCH_EVENTS};
}

export function cancelEvents() {
  return {type: CANCEL_EVENTS}
}

export function updateEvents(events) {
  return {type: UPDATE_EVENTS, events};
}
