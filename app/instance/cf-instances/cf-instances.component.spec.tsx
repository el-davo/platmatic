import * as React from 'React';
import {shallow, mount} from 'enzyme';
import {spy} from 'sinon';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {CfInstancesComponent} from './cf-instances.component';
import {CfInstanceCard} from './list/cf-instance-card.component';
import {CfInstancesState} from "./cf-instances.state";
import {Token} from "../../cloud/user/token.interface";

describe('Cf Instances Component', () => {

	let wrapper;
	let mounted;
	let cfInstances: CfInstancesState;
	let fetchCfInstances;

	beforeEach(() => {
		cfInstances = {
			showAddCfInstanceModal: false,
			isLoadingCfInstances: false,
			isAddingNewCfInstance: false,
			isDeletingCfInstance: false,
			instances: {
				'lab.run.io1': {
					isLoggedIn: true,
					cfInstance: 'lab.run.io1',
					token: {} as Token
				},
				'lab.run.io2': {
					isLoggedIn: true,
					cfInstance: 'lab.run.io2',
					token: {} as Token
				},
				'lab.run.io3': {
					isLoggedIn: true,
					cfInstance: 'lab.run.io3',
					token: {} as Token
				}
			}
		};
		fetchCfInstances = spy();
		wrapper = shallow(<CfInstancesComponent
			cfInstances={cfInstances}
			fetchCfInstances={fetchCfInstances}/>);
		mounted = mount(<MuiThemeProvider><CfInstancesComponent
			cfInstances={cfInstances}
			fetchCfInstances={fetchCfInstances}/></MuiThemeProvider>)
	});

	describe('layout', () => {

		it('should contain a list of cf instance cards', () => {
			wrapper.find(CfInstanceCard).should.have.length(3);
		});
	});

	describe('actions', () => {

		it('should fetch a list of cf instances', () => {
			fetchCfInstances.calledOnce.should.be.true();
		});
	});
});
