import {
  REQUEST_LOG_STREAM,
  LOG_STREAM_CONNECT_SUCCESS,
  LOG_STREAM_CONNECT_FAILED,
  REGISTER_LOG_STREAM_CALLBACK,
  LOG_STREAM_CALLBACK,
  REQUEST_TERMINATE_LOG_STREAM,
  LOG_STREAM_TERMINATE_SUCCESS,
  LOG_STREAM_TERMINATE_FAILED
} from './logs.action-types';

export function requestLogStream(app) {
  return {type: REQUEST_LOG_STREAM, app};
}

export function logStreamConnectSuccess() {
  return {type: LOG_STREAM_CONNECT_SUCCESS};
}

export function logStreamConnectFailed() {
  return {type: LOG_STREAM_CONNECT_FAILED};
}

export function registerLogStreamCallback(callback) {
  return {type: REGISTER_LOG_STREAM_CALLBACK, callback};
}

export function logStreamCallback(data) {
  return {type: LOG_STREAM_CALLBACK, data}
}

export function requestTerminateLogStream() {
  return {type: REQUEST_TERMINATE_LOG_STREAM};
}

export function logStreamTerminateSuccess() {
  return {type: LOG_STREAM_TERMINATE_SUCCESS};
}

export function logStreamTerminateFailed() {
  return {type: LOG_STREAM_TERMINATE_FAILED};
}
