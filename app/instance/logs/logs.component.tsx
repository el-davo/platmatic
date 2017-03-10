import * as React from 'react';
import IconButton from 'material-ui/IconButton';
import StopIcon from 'material-ui/svg-icons/navigation/close';
import {darkWhite, black} from 'material-ui/styles/colors';
import ToggleDisplay from 'react-toggle-display';
import {LogViewerComponent} from './log-viewer/log-viewer.component';
import {LoadingComponent} from '../../common/loading.component';

const style = {
  container: {
    position: 'absolute',
    height: '100vh',
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 10005,
    backgroundColor: black,
    opacity: 0.9
  },
  terminate: {
    position: 'absolute',
    top: -5,
    right: 5,
    zIndex: 9999
  },
  header: {
    color: darkWhite,
    margin: 10
  },
  closeButton: {
    width: 25,
    height: 25
  }
};

interface props {
	logs: any;
	registerLogStreamCallback(callback: any);
	requestTerminateLogStream();
}

export class LogsComponent extends React.Component<props, any> {

  constructor(props, context) {
    super(props, context);

    this._terminate = this._terminate.bind(this);
  }

  _terminate() {
    this.props.requestTerminateLogStream();
  }

  render() {
    return (
      <div style={style.container}>
        <table style={{height: '100%', width: '100%'}}>
          <tbody>
          <tr style={{height: 10}}>
            <td>
              <ToggleDisplay if={this.props.logs.isConnectedToWebSocket}>
                <span style={style.header}>
                  Viewing logs for: {this.props.logs.app.entity.name}
                </span>
              </ToggleDisplay>
            </td>
            <td>
              <IconButton style={style.terminate}
                          iconStyle={style.closeButton}
                          disabled={this.props.logs.isConnectingToWebSocket}
                          onClick={this._terminate}>
                <StopIcon color={darkWhite}/>
              </IconButton>
            </td>
          </tr>
          <tr>
            <td style={{verticalAlign: 'top'}} colSpan={2}>
              {this.props.logs.isConnectedToWebSocket && !this.props.logs.isConnectingToWebSocket ? (
                  <LogViewerComponent logs={this.props.logs}
                                      registerLogStreamCallback={this.props.registerLogStreamCallback}/>
                ) : (
                  <div style={{height: 200, textAlign: 'center'}}>
                    <LoadingComponent />
                  </div>
                )}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
}
