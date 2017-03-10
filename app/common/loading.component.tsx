import * as React from 'react';
import * as Loader from 'halogen/ScaleLoader';

const COLOR = '#008774';
const SIZE = '20px';

let style = {
	container: {
		paddingTop: 50
	}
};

export class LoadingComponent extends React.Component<any, any> {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<div style={style.container}>
				<Loader color={COLOR} size={SIZE}/>
			</div>
		)
	}
}
