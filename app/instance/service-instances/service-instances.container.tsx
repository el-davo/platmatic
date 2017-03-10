import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {BreadcrumbComponent} from '../../common/breadcrumb.component';
import {ServiceInstancesComponent} from './service-instances.component';
import * as actions from './service-instances.actions';

export const ServiceInstancesContainer = (props) => {
  return (
    <div>
      <BreadcrumbComponent routes={props.routes}
                           params={{organization_guid: props.organization_guid, space_guid: props.space_guid}}/>

      <ServiceInstancesComponent serviceInstances={props.serviceInstances}
                                 space_guid={props.space_guid}
                                 fetchServiceInstancesInSpace={props.actions.fetchServiceInstancesInSpace}
                                 clearServiceInstances={props.actions.clearServiceInstances}/>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    routes: ownProps.routes,
    serviceInstances: state.serviceInstances,
    organization_guid: ownProps.params.organization_guid,
    space_guid: ownProps.params.space_guid
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...actions}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServiceInstancesContainer);
