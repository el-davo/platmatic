import initialState from '../../initialState';
import {
  REQUEST_LOG_STREAM,
  LOG_STREAM_CONNECT_SUCCESS,
  LOG_STREAM_CONNECT_FAILED,
  LOG_STREAM_TERMINATE_SUCCESS
} from './logs.action-types';

export function logsReducer(state = initialState.logs, action) {
  switch (action.type) {
    case REQUEST_LOG_STREAM:
      return {...state, app: action.app, isConnectingToWebSocket: true};
    case LOG_STREAM_CONNECT_SUCCESS:
      return {...state, isConnectingToWebSocket: false, isConnectedToWebSocket: true};
    case LOG_STREAM_CONNECT_FAILED:
      return {...state, isConnectingToWebSocket: false, isConnectedToWebSocket: false, app: null};
    case LOG_STREAM_TERMINATE_SUCCESS:
      return {...state, isConnectedToWebSocket: false, app: null};
    default:
      return state;
  }
}
