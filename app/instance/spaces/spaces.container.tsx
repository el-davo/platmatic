import * as React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {BreadcrumbComponent} from '../../common/breadcrumb.component';
import {SpacesComponent} from './spaces.component';
import * as quotaActions from './quota/quota.actions';
import * as spacesActions from './spaces.actions';

export const SpacesContainer = (props) => {
  return (
    <div>
      <BreadcrumbComponent routes={props.routes} params={{organization_guid: props.organization_guid}}/>

      <SpacesComponent organization_guid={props.organization_guid}
                       spaces={props.spaces}
                       settings={props.settings}
                       fetchSpaces={props.actions.fetchSpaces}
                       clearSpaces={props.actions.clearSpaces}/>
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    routes: ownProps.routes,
    organization_guid: ownProps.params.organization_guid,
    quota: state.quota,
    spaces: state.spaces,
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...quotaActions, ...spacesActions}, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpacesContainer);
