import * as React from 'React';
import {shallow} from 'enzyme';
import {Card, CardActions, CardHeader} from 'material-ui/Card';
import {CfInstanceCard} from './cf-instance-card.component';
import {Instance} from "../cf-instances.state";
import {Token} from "../../../cloud/user/token.interface";

describe('Cf Instance Card Component', () => {

	let wrapper;
	let instance: Instance;

	beforeEach(() => {
		instance = {cfInstance: 'lab.run.io', isLoggedIn: true, token: {} as Token};
		wrapper = shallow(<CfInstanceCard instance={instance}/>);
	});

	describe('layout', () => {

		it('should contain a card', () => {
			wrapper.find(Card).should.have.length(1);
		});

		it('should have a card header with the correct text', () => {
			wrapper.find(Card).find(CardHeader).should.have.length(1);
			wrapper.find(Card).find({title: 'lab.run.io'}).should.have.length(1);
		});

		it('should have a button that links to the market view when clicked', () => {
			wrapper.find(Card).find(CardActions).find({label: 'Market'}).should.have.length(1);
		});

	});
});
