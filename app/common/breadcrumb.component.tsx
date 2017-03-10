import * as React from 'react';
import * as Breadcrumbs from 'react-breadcrumbs';

const style = {
  container: {
    marginBottom: 15
  }
};

export class BreadcrumbComponent extends React.Component<any, any> {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div style={style.container}>
        <Breadcrumbs
          routes={this.props.routes}
          params={this.props.params}
          excludes={['Organizations']}
        />
      </div>
    )
  }
}
