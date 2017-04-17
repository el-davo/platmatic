import * as React from 'React';
import {spy} from 'sinon';
import {shallow, mount} from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import ActiveInstanceIcon from 'material-ui/svg-icons/action/check-circle';
import {InstanceListComponent} from './instance-list.component';
import {SettingsState} from "../settings.state";
import {Token} from "../../cloud/user/token.interface";

describe('<InstanceListComponent />', () => {

	let wrapper;
	let mounted;
	let settings: SettingsState;

	beforeEach(() => {
		settings = {
			isLoggingIn: false,
			isLoggingOut: false,
			isRefreshingToken: false,
			isReadingSettings: false,
			isSettingsLoaded: true,
			showAddCfInstanceModal: false,
			cfInstances: {
				'lab.run.io': {
					cfInstance: 'lab.run.io',
					isLoggedIn: true,
					primary: true,
					token: {} as Token
				},
				'lab.run.io-1': {
					cfInstance: 'lab.run.io-1',
					isLoggedIn: true,
					primary: false,
					token: {} as Token
				}
			},
			activeInstance: {
				cfInstance: 'lab.run.io',
				isLoggedIn: true,
				primary: true,
				token: {} as Token
			}
		};
		wrapper = shallow(<InstanceListComponent settings={settings}/>);
		mounted = mount(<MuiThemeProvider><InstanceListComponent settings={settings}/></MuiThemeProvider>);
	});

	describe('layout', () => {

		it('should contain a list', () => {
			wrapper.find(List).should.have.length(1);
		});

		it('should have 2 list items', () => {
			wrapper.find(List).find(ListItem).should.have.length(2);
		});

		it('should have the correct instance name on the list items', () => {
			wrapper.find(List).find({primaryText: 'lab.run.io'}).should.have.length(1);
			wrapper.find(List).find({primaryText: 'lab.run.io-1'}).should.have.length(1);
		});

		it('should highlight the active instance', () => {
			mounted.find(List).find(ActiveInstanceIcon).should.have.length(1);
		});
	});
});
