/**
 * For more information on cloud foundry protobuf see link below
 *
 * https://github.com/cloudfoundry/dropsonde-protocol/blob/master/events/README.md
 *
 */
export const messageProto = `
 message Envelope {
  message LogMessage {
    required bytes message = 1;
    enum MessageType {OUT = 1; ERR = 2;} 
    required MessageType message_type = 2;
    required int64 timestamp = 3;
    optional bytes app_id = 4;
    optional bytes source_type = 5;
    optional bytes source_instance = 6;
  }
  message TagsEntry {
  }
  required bytes origin = 1; 
  enum EventType {HttpStartStop = 4; LogMessage = 5; ValueMetric = 6; CounterEvent = 7; Error = 8; ContainerMetric = 9;} 
  required EventType eventType = 2;
  optional int64 timestamp = 6;
  optional bytes deployment = 13;
  optional bytes job = 14;
  optional bytes index = 15;
  optional bytes ip = 16;
  optional LogMessage logMessage = 8;
  }
`;
