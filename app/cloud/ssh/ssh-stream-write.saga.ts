import {takeEvery, takeLatest} from 'redux-saga';
import {SEND_COMMAND} from '../../instance/ssh/ssh.action-types';

function* sendCommand(stream, {command}) {
  try {
    stream.write(command);
  } catch (err) {
    console.log(err);
  }
}

export function* sshStreamWriteSaga(stream) {
  yield* takeLatest(SEND_COMMAND, sendCommand, stream);
}
