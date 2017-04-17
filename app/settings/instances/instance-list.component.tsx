import * as React from 'React';
import {List, ListItem} from 'material-ui/List';
import ActiveInstanceIcon from 'material-ui/svg-icons/action/check-circle';
import {green700} from 'material-ui/styles/colors';
import {SettingsState} from "../settings.state";

interface Props {
	settings: SettingsState
}

export class InstanceListComponent extends React.Component<Props, any> {

	constructor(props, context) {
		super(props, context);
	}

	render() {
		return (
			<List>
				{
					Object.keys(this.props.settings.cfInstances).map(key => {
						return <ListItem
							key={key}
							primaryText={this.props.settings.cfInstances[key].cfInstance}
							leftIcon={this.props.settings.cfInstances[key].primary ? <ActiveInstanceIcon color={green700} />: null}/>
					})
				}
			</List>
		)
	}
}
