import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BreadcrumbComponent } from '../../common/breadcrumb.component';
import { AppStatsComponent } from './app-stats.component';
import * as statsActions from './app-stats.actions';
import * as appsActions from '../apps/apps.actions';
import { appStatsState } from './app-stats.state';

interface props {
  appStats: appStatsState;
  routes: any;
  guid: string;
  organization_guid: string;
  space_guid: string;
  actions: actions;
}

interface actions {
  refreshAppStats(guid: string);
  fetchAppStats(guid: string);
  clearStats();
  openScaleDialog();
  closeScaleDialog();
  requestScaleApp(guid: string, instances: number, memory: number, disk: number);
}

const AppStatsContainer: React.StatelessComponent<props> = props => {
  return (
    <div>
      <BreadcrumbComponent routes={props.routes}
        params={{ organization_guid: props.organization_guid, space_guid: props.space_guid }} />

      <AppStatsComponent appStats={props.appStats}
        guid={props.guid}
        fetchAppStats={props.actions.fetchAppStats}
        refreshAppStats={props.actions.refreshAppStats}
        clearStats={props.actions.clearStats}
        openScaleDialog={props.actions.openScaleDialog}
        closeScaleDialog={props.actions.closeScaleDialog}
        requestScaleApp={props.actions.requestScaleApp} />
    </div>
  );
};

function mapStateToProps(state, ownProps) {
  return {
    organization_guid: ownProps.params.organization_guid,
    space_guid: ownProps.params.space_guid,
    guid: ownProps.params.guid,
    appStats: state.appStats
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...statsActions, ...appsActions }, dispatch)
  };
}

export default connect<{}, {}, any>(
  mapStateToProps,
  mapDispatchToProps
)(AppStatsContainer);
