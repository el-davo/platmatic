import * as React from 'react';
import {Card, CardText} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';

const DEFAULT_IMAGE = './img/default-services-image.png';

interface props {
	serviceInstances: any
}

export class ServiceInstancesListComponent extends React.Component<props, any> {

  constructor(props, context) {
    super(props, context);
  }

  _onImageError(e) {
    e.target.src = DEFAULT_IMAGE;
  }

  render() {
    return (
      <Card>
        <CardText>
          <List>
            {
              Object.keys(this.props.serviceInstances.instances).map(key => {
                return <ListItem key={key}
                                 primaryText={this.props.serviceInstances.instances[key].entity.name}
                                 secondaryText={this.props.serviceInstances.instances[key].entity.service_plan.entity.service.entity.description}
                                 leftAvatar={<Avatar onError={this._onImageError} src={(JSON.parse(this.props.serviceInstances.instances[key].entity.service_plan.entity.service.entity.extra) || {}).imageUrl || DEFAULT_IMAGE}/>}/>
              })
            }
          </List>
        </CardText>
      </Card>
    )
  }
}
