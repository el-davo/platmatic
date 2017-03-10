import initialState from '../../initialState';
import {
	FETCH_MARKET_ASSETS,
	ADD_MARKET_ASSETS,
	CLEAR_MARKET_ASSETS,
	REQUEST_FETCH_PURCHASE_PLANS,
	ADD_PURCHASE_PLANS,
	REQUEST_PURCHASE_PLANS_FAILED,
	CLOSE_PURCHASE_PLANS,
	SELECT_PURCHASE_PLAN,
	SHOW_PURCHASE_SELECT_SPACE,
	HIDE_PURCHASE_SELECT_SPACE,
	REQUEST_FETCH_PURCHASE_SPACES,
	UPDATE_PURCHASE_SPACES,
	REQUEST_PURCHASE_SERVICE,
	SHOW_PURCHASE_COMPLETE_SCREEN,
	HIDE_PURCHASE_COMPLETE_SCREEN
} from './market.action-types';
import {marketReducer} from './market.reducer';

describe('Market Reducer', () => {

	describe('FETCH_MARKET_ASSETS', () => {

		it('should fetch market assets', () => {
			let action = {type: FETCH_MARKET_ASSETS, page: 10};
			let state = {...initialState.market};

			marketReducer(state, action).should.eql({...state, isFetchingMarketAssets: true, page: 10});
		});
	});

	describe('ADD_MARKET_ASSETS', () => {

		it('should add more market assets to the list', () => {
			let action = {type: ADD_MARKET_ASSETS, assets: {total_pages: 10, resources: [{id: 2}, {id: 3}]}};
			let state = {...initialState.market, isFetchingMarketAssets: true, page: 1, totalPages: 0, assets: [{id: 1}]};

			marketReducer(state, action).should.eql({
				...state,
				assets: [{id: 1}, {id: 2}, {id: 3}],
				isFetchingMarketAssets: false,
				page: 1,
				totalPages: 10
			});
		});
	});

	describe('CLEAR_MARKET_ASSETS', () => {

		it('should clear the market assets list', () => {
			let action = {type: CLEAR_MARKET_ASSETS};
			let state = {...initialState.market, assets: [{id: 1}, {id: 2}], page: 10};

			marketReducer(state, action).should.eql({...state, assets: [], page: 1});
		});
	});

	describe('REQUEST_FETCH_PURCHASE_PLANS', () => {

		it('should get purchase information for a particular service', () => {
			let action = {type: REQUEST_FETCH_PURCHASE_PLANS, page: 2, service: {name: 'abc123'}};
			let state = {
				...initialState.market,
				purchasePlans: {
					...initialState.market.purchasePlans,
					page: 1,
					showPurchaseOverlay: false,
					isFetchingPurchaseInfo: false,
					plans: [{extra: ''}, {extra: ''}]
				}
			};

			marketReducer(state, action).should.eql({
				...state,
				purchasePlans: {
					...state.purchasePlans,
					page: 2,
					showPurchaseOverlay: true,
					isFetchingPurchaseInfo: true,
					plans: [],
					service: action.service
				}
			});
		});
	});

	describe('ADD_PURCHASE_PLANS', () => {

		it('should add purchase plans to the list', () => {
			let action = {type: ADD_PURCHASE_PLANS, plans: [{extra: ''}]};
			let state = {
				...initialState.market,
				purchasePlans: {
					...initialState.market.purchasePlans,
					showPurchaseOverlay: true,
					isFetchingPurchaseInfo: true,
					plans: [{extra: ''}]
				}
			};

			marketReducer(state, action).should.eql({
				...state,
				purchasePlans: {...state.purchasePlans, isFetchingPurchaseInfo: false, plans: [{extra: ''}, {extra: ''}]}
			});
		});
	});

	describe('REQUEST_PURCHASE_PLANS_FAILED', () => {

		it('should hide the purchase plan overlay', () => {
			let action = {type: REQUEST_PURCHASE_PLANS_FAILED};
			let state = {
				...initialState.market,
				purchasePlans: {
					...initialState.market.purchasePlans,
					showPurchaseOverlay: true,
					isFetchingPurchaseInfo: true,
					plans: [{extra: ''}]
				}
			};

			marketReducer(state, action).should.eql({
				...state,
				purchasePlans: {...state.purchasePlans, isFetchingPurchaseInfo: false, showPurchaseOverlay: false, plans: []}
			});
		});
	});

	describe('CLOSE_PURCHASE_PLANS', () => {

		it('should close the purchase plans overlay', () => {
			let action = {type: CLOSE_PURCHASE_PLANS};
			let state = {
				...initialState.market,
				purchasePlans: {
					...initialState.market.purchasePlans,
					showPurchaseOverlay: true,
					isFetchingPurchaseInfo: true,
					showPurchaseSelectSpace: true,
					showPurchaseCompleteScreen: true,
					plans: [{extra: ''}],
					selectedPurchasePlan: {id: 'abc123'}
				}
			};

			marketReducer(state, action).should.eql({
				...state,
				purchasePlans: {
					...state.purchasePlans,
					isFetchingPurchaseInfo: false,
					showPurchaseOverlay: false,
					showPurchaseSelectSpace: false,
					showPurchaseCompleteScreen: false,
					plans: [],
					selectedPurchasePlan: {}
				}
			});
		});
	});

	describe('SELECT_PURCHASE_PLAN', () => {

		it('should display purchase information for a selected purchase plan', () => {
			let action = {type: SELECT_PURCHASE_PLAN, plan: {id: 'abc123'}};
			let state = {
				...initialState.market,
				purchasePlans: {
					...initialState.market.purchasePlans,
					isFetchingSpaces: true,
					showPurchaseSelectSpace: true
				}
			};

			marketReducer(state, action).should.eql({
				...state,
				purchasePlans: {
					...state.purchasePlans,
					selectedPurchasePlan: action.plan,
					isFetchingSpaces: false,
					showPurchaseSelectSpace: false
				}
			});
		});
	});

	describe('SHOW_PURCHASE_SELECT_SPACE', () => {

		it('should show the purchase space select screen', () => {
			let action = {type: SHOW_PURCHASE_SELECT_SPACE};
			let state = {
				...initialState.market, purchasePlans: {...initialState.market.purchasePlans, showPurchaseSelectSpace: false}
			};

			marketReducer(state, action).should.eql({
				...state,
				purchasePlans: {...state.purchasePlans, showPurchaseSelectSpace: true}
			});
		});
	});

	describe('HIDE_PURCHASE_SELECT_SPACE', () => {

		it('should hide the purchase space select screen', () => {
			let action = {type: HIDE_PURCHASE_SELECT_SPACE};
			let state = {
				...initialState.market, purchasePlans: {...initialState.market.purchasePlans, showPurchaseSelectSpace: true}
			};

			marketReducer(state, action).should.eql({
				...state,
				purchasePlans: {...state.purchasePlans, showPurchaseSelectSpace: false}
			});
		});
	});

	describe('REQUEST_FETCH_PURCHASE_SPACES', () => {

		it('should request spaces to allow user to purchase a service', () => {
			let action = {type: REQUEST_FETCH_PURCHASE_SPACES};
			let state = {
				...initialState.market, purchasePlans: {...initialState.market.purchasePlans, isFetchingSpaces: false}
			};

			marketReducer(state, action).should.eql({
				...state,
				purchasePlans: {...state.purchasePlans, isFetchingSpaces: true}
			});
		});
	});

	describe('UPDATE_PURCHASE_SPACES', () => {

		it('should update hte spaces to display to the user when purchasing a service', () => {
			let action = {type: UPDATE_PURCHASE_SPACES, spaces: [{entity: {id: '1'}}, {entity: {id: '2'}}]};
			let state = {
				...initialState.market,
				purchasePlans: {...initialState.market.purchasePlans, spaces: [], isFetchingSpaces: true}
			};

			marketReducer(state, action).should.eql({
				...state,
				purchasePlans: {...state.purchasePlans, spaces: action.spaces, isFetchingSpaces: false}
			});
		});
	});

	describe('REQUEST_PURCHASE_SERVICE', () => {

		it('should purchase a new service', () => {
			let action = {type: REQUEST_PURCHASE_SERVICE, name: 'service-test', spaceGuid: 'abc123'};
			let state = {
				...initialState.market, purchasePlans: {...initialState.market.purchasePlans, isPurchasingService: false}
			};

			marketReducer(state, action).should.eql({
				...state,
				purchasePlans: {...state.purchasePlans, isPurchasingService: true}
			});
		});
	});

	describe('SHOW_PURCHASE_COMPLETE_SCREEN', () => {

		it('should show the purchase complete screen', () => {
			let action = {type: SHOW_PURCHASE_COMPLETE_SCREEN};
			let state = {
				...initialState.market,
				purchasePlans: {
					...initialState.market.purchasePlans,
					showPurchaseCompleteScreen: false,
					isPurchasingService: true
				}
			};

			marketReducer(state, action).should.eql({
				...state,
				purchasePlans: {...state.purchasePlans, showPurchaseCompleteScreen: true, isPurchasingService: false}
			});
		});
	})

	describe('HIDE_PURCHASE_COMPLETE_SCREEN', () => {

		it('should show the purchase complete screen', () => {
			let action = {type: HIDE_PURCHASE_COMPLETE_SCREEN};
			let state = {
				...initialState.market, purchasePlans: {...initialState.market.purchasePlans, showPurchaseCompleteScreen: true}
			};

			marketReducer(state, action).should.eql({
				...state,
				purchasePlans: {...state.purchasePlans, showPurchaseCompleteScreen: false}
			});
		});
	})
});
