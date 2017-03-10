import * as React from 'react';
import * as Terminal from 'xterm';
import 'xterm/lib/addons/fit/fit';

const style = {
	terminal: {
		height: '100%'
	}
};

interface props {
	ssh: Object;
	registerCallbackListener(callback)
	sendCommand(command: string)
}

export class TerminalComponent extends React.Component<props, any> {

	refs: {
		terminal: any;
	};

	constructor(props, context) {
		super(props, context);

		this.state = {
			terminal: new Terminal({
				cursorBlink: true
			})
		};

		this._handleResize = this._handleResize.bind(this);
		this._handleKey = this._handleKey.bind(this);
		this._commandCallback = this._commandCallback.bind(this);
	}

	componentDidMount() {
		this.state.terminal.open(this.refs.terminal);
		this.state.terminal.focus();
		this.state.terminal.fit();

		this.state.terminal.on('key', this._handleKey);

		window.addEventListener('resize', this._handleResize);

		setTimeout(() => {
			this.props.registerCallbackListener(this._commandCallback);
		}, 250);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this._handleResize);
		this.state.terminal.off('key', this._handleKey);
	}

	_handleResize() {
		this.state.terminal.fit();
	}

	_handleKey(event) {
		this.props.sendCommand(event);
	}

	_commandCallback(output) {
		this.state.terminal.write(output);
	}

	render() {
		return (
			<div style={style.terminal}>
				<div style={style.terminal} ref="terminal"></div>
			</div>
		)
	}
}
