import * as React from 'react';
import {ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {fetchServiceInstanceById} from '../../../cloud/service-instances/service-instances.service';

const DEFAULT_IMAGE = './img/default-services-image.png';

interface props {
	settings: any;
	service: any;
}

export class BoundServiceListItemComponent extends React.Component<props, any> {

	constructor(props, context) {
		super(props, context);

		this.state = {
			serviceSummary: {}
		};

		this._getServiceIcon = this._getServiceIcon.bind(this);
	}

	async componentDidMount() {
		let serviceSummary = await fetchServiceInstanceById(this.props.settings, this.props.service.entity.service_instance.entity.service_guid);
		this.setState({serviceSummary})
	}

	_getServiceIcon() {
		return (this.state.serviceSummary.entity || {}).extra ? JSON.parse(this.state.serviceSummary.entity.extra).imageUrl : '';
	}

	_onImageError(e) {
		e.target.src = DEFAULT_IMAGE;
	}

	render() {
		return (
			<ListItem
				disabled={true}
				primaryText={this.props.service.entity.service_instance.entity.name}
				secondaryText={this.props.service.entity.service_instance.entity.service_plan.entity.description}
				leftAvatar={<Avatar onError={this._onImageError} src={this._getServiceIcon()}/>}
			/>
		)
	}
}
