import * as React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const style = {
	bottom: 15,
	right: 15,
	position: 'fixed'
};

interface props {
	selectTargetDirectory();
}

export class CreateAppFloatingButtonComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<FloatingActionButton style={style} onClick={() => this.props.selectTargetDirectory()}>
				<ContentAdd />
			</FloatingActionButton>
		)
	}
}
