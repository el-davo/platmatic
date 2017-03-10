import * as React from 'react';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import {List} from 'material-ui/List';
import ToggleDisplay from 'react-toggle-display';
import {AppResultComponent} from './app-result.component';

const styles = {
	card: {
		margin: 20
	}
};

interface props {
	search: any;
	hideSearchOverlay();
	requestLoginSSH(app: any, appInstance: number);
	requestLogStream(app: any);
}

export class AppResultsComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);

		this._hideSearchOverlay = this._hideSearchOverlay.bind(this);
	}

	_hideSearchOverlay() {
		this.props.hideSearchOverlay();
	}

	render() {
		return (
			<ToggleDisplay if={this.props.search.appResults.length > 0}>
				<Card style={styles.card}>
					<CardTitle title="Apps"/>
					<CardText>
						<List>
							{this.props.search.appResults.map((app, index) => {
								return <AppResultComponent key={index}
																					 app={app}
																					 requestLoginSSH={this.props.requestLoginSSH}
																					 requestLogStream={this.props.requestLogStream}/>
							})}
						</List>
					</CardText>
				</Card>
			</ToggleDisplay>
		)
	}
}
