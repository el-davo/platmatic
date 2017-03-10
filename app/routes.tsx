import * as React from 'react';
import {Router, Route, hashHistory, IndexRoute} from 'react-router';
import LayoutContainer from './layout/layout.container';
import OrganizationsContainer from './instance/organizations/organizations.container';
import SpacesContainer from './instance/spaces/spaces.container';
import AppsContainer from './instance/apps/apps.container';
import MarketContainer from './instance/market/market.container';
import SettingsContainer from './settings/settings.container';
import AppStatsContainer from './instance/app-stats/app-stats.container';
import StacksContainer from './instance/stacks/stacks.container';
import EventsContainer from './instance/events/events.container';
import CreateAppsListContainer from './instance/create-app/create-apps-list.container';
import ServiceInstancesContainer from './instance/service-instances/service-instances.container';
import UsersContainer from './instance/users/users.container';

export default (
	<Router history={hashHistory}>
		<Route name="Home" path="/" component={LayoutContainer}>
			<IndexRoute component={OrganizationsContainer}/>

			<Route name="Organizations" path="organizations">
				<IndexRoute component={OrganizationsContainer}/>

				<Route name="Users" path=":organization_guid/users">
					<IndexRoute component={UsersContainer}/>
				</Route>

				<Route name="Spaces" path=":organization_guid/spaces">
					<IndexRoute component={SpacesContainer}/>
					<Route name="Apps" path=":space_guid/apps">
						<IndexRoute component={AppsContainer}/>
						<Route name="Stats" path=":guid/stats">
							<IndexRoute component={AppStatsContainer}/>
						</Route>
					</Route>
					<Route name="Service Instances" path=":space_guid/service-instances">
						<IndexRoute component={ServiceInstancesContainer}/>
					</Route>
				</Route>
			</Route>

			<Route name="Market" path="market" component={MarketContainer}/>

			<Route name="Events" path="events">
				<IndexRoute component={EventsContainer}/>
			</Route>

			<Route name="Stacks" path="stacks" component={StacksContainer}/>

			<Route name="Create App" path="create" component={CreateAppsListContainer}/>

			<Route name="Settings" path="settings" component={SettingsContainer}/>
		</Route>
		<Route name="404: No Match for route" path="*" component={LayoutContainer}/>
	</Router>
);
