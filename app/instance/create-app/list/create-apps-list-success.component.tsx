import * as React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {List} from 'material-ui/List';
import {CreateAppSuccessComponent} from './create-app-success.component';

interface props {
	createApp: any
}

export class CreateAppsListSuccessComponent extends React.Component<props, any> {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Card initiallyExpanded={true}>
       <CardHeader
          title="Deployed"
          actAsExpander={true}
          showExpandableButton={true}
        />
          <CardText expandable={true}>
              <List>
                {Object.keys(this.props.createApp.success).map(key => {
                  return <CreateAppSuccessComponent key={key} app={this.props.createApp.success[key]}/>
                })}
              </List>
          </CardText>
      </Card>
    )
  }
}
