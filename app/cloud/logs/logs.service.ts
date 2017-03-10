import {eventChannel} from 'redux-saga';
import request from 'request';
import * as WebSocket from 'ws';
import * as protobuf from 'protocol-buffers';
import * as dateformat from 'dateformat';
import {logStreamCallback} from '../../instance/logs/logs.actions';
import {messageProto} from './protobuf-definitions';

export function getRecentLogs(settings, app) {
  return new Promise((resolve, reject) => {
    request.get(`${settings.cfInstance}/logs/apps/${app.metadata.guid}/recentlogs`, {
      headers: {
        Authorization: `${settings.token.token_type} ${settings.token.access_token}`,
        Accept: "application/json"
      },
      rejectUnauthorized: false
    }, (err, response, data) => {
      err ? reject(err) : resolve(data);
    });
  });
}

export function connectToLogWebsocket(settings, instance, app) {
  return new Promise((resolve, reject) => {
    let ws = new WebSocket(`${instance.doppler_logging_endpoint}/apps/${app.metadata.guid}/stream`, {
      headers: {
        Authorization: `${settings.token.token_type} ${settings.token.access_token}`,
      },
      rejectUnauthorized: false
    });

    ws.on('open', () => resolve(ws));
    ws.on('error', err => reject(err));
  });
}

export function listenToWebsocket(ws) {
  return eventChannel(emitter => {
    let proto = protobuf(messageProto);

    ws.on('message', (data) => {
      let envelope = proto.Envelope.decode(new Uint8Array(data));

      if (!envelope.logMessage) {
        return;
      }

      let logMessage = new Buffer(envelope.logMessage.message).toString('ascii');
      let logSourceType = new Buffer(envelope.logMessage.source_type).toString('ascii');
      let logSourceInstance = new Buffer(envelope.logMessage.source_instance).toString('ascii');
      let timestamp = dateformat(envelope.logMessage.timestamp ? new Date() : envelope.logMessage.timestamp, 'isoDateTime');
      let message = `[01;34m${timestamp}[0m [01;34m${logSourceType}/${logSourceInstance}[0m ${renderMessage(envelope, logMessage)}`;

      emitter(logStreamCallback(message));
    });

    return () => {
    };
  });
}

function renderMessage(envelope, logMessage) {
  return envelope.logMessage.message_type === 2 ? `[01;31m${logMessage}[0m` : logMessage;
}
