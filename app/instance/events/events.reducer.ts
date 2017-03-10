import initialState from '../../initialState';
import {FETCH_EVENTS, CANCEL_EVENTS, UPDATE_EVENTS} from './events.action-types';

export function eventsReducer(state = initialState.events, action) {
  switch (action.type) {
    case FETCH_EVENTS:
      return {...state, fetchEvents: true};
    case CANCEL_EVENTS:
      return {...state, fetchEvents: false};
    case UPDATE_EVENTS:
      return {...state, list: action.events};
    default:
      return state;
  }
}
