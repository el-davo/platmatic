import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {reducer as toastr} from 'react-redux-toastr';
import {locationReducer as activePage} from './layout/location.reducer';
import {organizationsReducer as organizations} from './instance/organizations/organizations.reducer';
import {spacesReducer as spaces} from './instance/spaces/spaces.reducer';
import {quotaReducer as quota} from './instance/spaces/quota/quota.reducer';
import {serviceInstancesReducer as serviceInstances} from './instance/service-instances/service-instances.reducer';
import {appsReducer as apps} from './instance/apps/apps.reducer';
import {appStatsReducer as appStats} from './instance/app-stats/app-stats.reducer';
import {settingsReducer as settings} from './settings/settings.reducer';
import {searchReducer as search} from './instance/search/search.reducer';
import {stacksReducer as stacks} from './instance/stacks/stacks.reducer';
import {eventsReducer as events} from './instance/events/events.reducer';
import {sshReducer as ssh} from './instance/ssh/ssh.reducer';
import {createAppReducer as createApp} from './instance/create-app/create-app.reducer';
import {logsReducer as logs} from './instance/logs/logs.reducer';
import {marketReducer as market} from './instance/market/market.reducer';
import {usersReducer as users} from './instance/users/users.reducer';

export const rootReducer = combineReducers({
  routing,
  activePage,
  toastr,
  organizations,
  spaces,
  quota,
  serviceInstances,
  apps,
  appStats,
  settings,
  search,
  stacks,
  events,
  ssh,
  createApp,
  logs,
  market,
  users
});

export default rootReducer;
