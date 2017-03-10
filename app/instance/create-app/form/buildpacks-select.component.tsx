import * as React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

interface props {
	createApp: any;
	onChange(value)
}

export class BuildpacksSelectComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);

		this.state = {
			selected: ''
		};

		this._handleChange = this._handleChange.bind(this);
	}

	_handleChange(value) {
		this.setState({selected: value});
		this.props.onChange(value);
	}

	render() {
		return (
			<AutoComplete
				dataSource={this.props.createApp.form.buildpacks.map(buildpack => buildpack.entity.name)}
				floatingLabelText="Buildpack"
				filter={AutoComplete.fuzzyFilter}
				openOnFocus={true}
				onUpdateInput={this._handleChange}
				onNewRequest={this._handleChange}
				fullWidth={true}
			/>
		)
	}
}
