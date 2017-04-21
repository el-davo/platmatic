import * as React from 'React';
import {shallow} from 'enzyme';
import {spy} from 'sinon';
import {CfInstancesContainer} from './cf-instances.container';
import {CfInstancesState} from "./cf-instances.state";
import {BreadcrumbComponent} from '../../common/breadcrumb.component';
import {CfInstancesComponent} from './cf-instances.component';

describe('Cf Instances Container', () => {

	let wrapper;
	let cfInstances: CfInstancesState;

	beforeEach(() => {
		cfInstances = {
			showAddCfInstanceModal: false,
			isLoadingCfInstances: false,
			isAddingNewCfInstance: false,
			isDeletingCfInstance: false,
			instances: {}
		};
		const actions = {
			fetchCfInstances: spy()
		};

		wrapper = shallow(<CfInstancesContainer
			routes={{}}
			cfInstances={cfInstances}
			actions={actions}
		/>);
	});

	describe('layout', () => {

		it('should have breadcrumbs', () => {
			wrapper.find(BreadcrumbComponent).should.have.length(1);
		});

		it('should have a cf instances component', () => {
			wrapper.find(CfInstancesComponent).should.have.length(1);
		});
	});
});
