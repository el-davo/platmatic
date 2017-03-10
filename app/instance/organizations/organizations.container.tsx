import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {BreadcrumbComponent} from '../../common/breadcrumb.component';
import {OrganizationsComponent} from './organizations.component';
import * as actions from './organizations.actions';

export const OrganizationContainer = (props) => {

  return (
    <div>
      <BreadcrumbComponent routes={props.routes}/>

      <OrganizationsComponent organizations={props.organizations}
                              fetchOrganizations={props.actions.fetchOrganizations}
                              clearOrganizations={props.actions.clearOrganizations}
                              fetchOrganizationSummary={props.actions.fetchOrganizationSummary}/>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    routes: ownProps.routes,
    organizations: state.organizations
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
)(OrganizationContainer);
