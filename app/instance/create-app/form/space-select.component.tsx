import * as React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const style = {
	width: '100%',
	margin: 0,
	padding: 0
};

interface props {
	createApp: any;
	onChange(value)
}

export class SpaceSelectComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);

		this.state = {
			selected: ''
		};

		this._handleChange = this._handleChange.bind(this);
	}

	_handleChange(event, index, value) {
		this.setState({selected: value});
		this.props.onChange(value);
	}

	render() {
		return (
			<SelectField style={style}
									 floatingLabelText="Space"
									 onChange={this._handleChange}
									 value={this.state.selected}>
				{
					this.props.createApp.form.spaces.map((space, key) => {
						return <MenuItem key={key} value={space.metadata.guid} primaryText={space.entity.name}/>
					})
				}
			</SelectField>
		)
	}
}
