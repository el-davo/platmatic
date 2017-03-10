import * as React from 'react';
import * as Terminal from 'xterm';
import 'xterm/lib/addons/fit/fit';

const style = {
  terminal: {
    height: '100%'
  }
};

interface props {
	logs: any;
	registerLogStreamCallback(callback)
}

export class LogViewerComponent extends React.Component<props, any> {

	state: {
		terminal: any
	};

	refs: {
		terminal: any
	};

  constructor(props, context) {
    super(props, context);

		this.state = {
			terminal: new Terminal({
				cursorBlink: true
			})
		};

    this._handleResize = this._handleResize.bind(this);
    this._commandCallback = this._commandCallback.bind(this);
  }

  componentDidMount() {
    this.state.terminal.open(this.refs.terminal);
    this.state.terminal.fit();

    window.addEventListener('resize', this._handleResize);

    setTimeout(() => {
      this.props.registerLogStreamCallback(this._commandCallback);
    }, 250);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize);
  }

  _handleResize() {
    this.state.terminal.fit();
  }

  _commandCallback(output) {
    this.state.terminal.writeln(output);
  }

  render() {
    return (
      <div style={style.terminal}>
        <div style={style.terminal} ref="terminal"></div>
      </div>
    )
  }
}
