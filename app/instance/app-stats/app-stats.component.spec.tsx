import * as React from 'react';
import {AppStatsCardComponent} from './app-stats-card.component';
import {shallow} from 'enzyme';
import {spy} from 'sinon';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import {List} from 'material-ui/List';
import {appStatsState} from './app-stats.state';

describe('App stats card component', () => {

	let wrapper;
	let appStats;
	let openScaleDialog;
	let closeScaleDialog;
	let requestScaleApp;
	let requestLoginSSH;

	beforeEach(() => {
		appStats = {
			summary: {
				name: 'testName',
				instances: 10,
				memory: 10,
				buildpack: 'nodejs',
				guid: 'abc123'
			},
			app: {
				id: 'abc123'
			}
		} as appStatsState;
		openScaleDialog = spy();
		closeScaleDialog = spy();
		requestScaleApp = spy();
		requestLoginSSH = spy();

		wrapper = shallow(<AppStatsCardComponent
			appStats={appStats}
			openScaleDialog={openScaleDialog}
			closeScaleDialog={closeScaleDialog}
			requestScaleApp={requestScaleApp}
			requestLoginSSH={requestLoginSSH}/>);
	});

	describe('layout', () => {

		it('should contain a card with the correct header', () => {
			wrapper.find(Card).should.have.length(1);
			wrapper.find(Card).find(CardHeader).should.have.length(1);
			wrapper.find({title: 'testName'}).should.have.length(1);
			wrapper.find({subtitle: '10 Instances'}).should.have.length(1);
			wrapper.find(Card).find(CardText).should.have.length(1);
		});

		it('should contain the correct stats', () => {
			wrapper.find(CardText).find(List).should.have.length(1);
			wrapper.find(List).find({primaryText: 10}).should.have.length(1);
			wrapper.find(List).find({primaryText: 'nodejs'}).should.have.length(1);
		});

		it('should have the correct amount of actions', () => {
			wrapper.find(CardActions).find(FlatButton).should.have.length(2);
		});

		it('should have a scale button', () => {
			wrapper.find(CardActions).find({label: 'Scale'}).should.have.length(1);
		});

		it('should have an ssh button', () => {
			wrapper.find(CardActions).find({label: 'SSH'}).should.have.length(1);
		});
	});

	describe('actions', () => {

		it('should open the ssh screen when the ssh button is clicked', () => {
			wrapper.find(CardActions).find({label: 'SSH'}).simulate('touchTap');

			requestLoginSSH.calledOnce.should.be.true();
			requestLoginSSH.calledWith(appStats.app, 0).should.be.true();
		});
	});
});
