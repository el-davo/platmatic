import * as React from 'react';
import UserContainer from './user/user.container';

export class SettingsComponent extends React.Component<any, any> {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <UserContainer />
    )
  }
}
