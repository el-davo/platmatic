import * as React from 'react';
import {LoadingComponent} from '../common/loading.component';

export class AppInitComponent extends React.Component<any, any> {

	constructor(props, context) {
		super(props, context);
	}

	componentDidMount() {
		this.props.requestGetSettings();
	}

	render() {
		return (
			<div style={{textAlign: 'center', marginTop: 100}}>
				<LoadingComponent />
			</div>
		)
	}
}
