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
import {
  fetchMarketAssets,
  addMarketAssets,
  clearMarketAssets,
  requestFetchPurchasePlans,
  addPurchasePlans,
  requestPurchasePlansFailed,
  closePurchasePlans,
  selectPurchasePlan,
  showPurchaseSelectSpace,
  hidePurchaseSelectSpace,
  requestFetchPurchaseSpaces,
  updatePurchaseSpaces,
  requestPurchaseService,
  showPurchaseCompleteScreen,
  hidePurchaseCompleteScreen
} from './market.actions';

describe('Market Actions', () => {

  describe('fetchMarketAssets()', () => {

    it('should request market assets', () => {
      let page = 1;

      fetchMarketAssets(page).should.eql({type: FETCH_MARKET_ASSETS, page});
    });
  });

  describe('addMarketAssets()', () => {

    it('should add market assets to the list', () => {
      let assets = [{id: 1}, {id: 2}];

      addMarketAssets(assets).should.eql({type: ADD_MARKET_ASSETS, assets});
    });
  });

  describe('clearMarketAssets()', () => {

    it('should cleat marker assets', () => {
      clearMarketAssets().should.eql({type: CLEAR_MARKET_ASSETS});
    });
  });

  describe('requestFetchPurchasePlans()', () => {

    it('should request retrieval of purchase plans for a service', () => {
      let service = {id: 'abc123'};
      let page = 1;
      requestFetchPurchasePlans(service, page).should.eql({type: REQUEST_FETCH_PURCHASE_PLANS, page, service});
    });

    it('page should default to one if not supplied', () => {
      let service = {id: 'abc123'};
      requestFetchPurchasePlans(service).should.eql({type: REQUEST_FETCH_PURCHASE_PLANS, page: 1, service});
    });
  });

  describe('addPurchasePlans()', () => {

    it('should add service plans to the list', () => {
      let plans = [{extra: '{}'}, {extra: '{}'}];
      addPurchasePlans(plans).should.eql({type: ADD_PURCHASE_PLANS, plans});
    });
  });

  describe('requestPurchasePlansFailed()', () => {

    it('should hide the purchase overlay', () => {
      requestPurchasePlansFailed().should.eql({type: REQUEST_PURCHASE_PLANS_FAILED});
    });
  });

  describe('closePurchasePlans()', () => {

    it('should close the purchase overlay', () => {
      closePurchasePlans().should.eql({type: CLOSE_PURCHASE_PLANS});
    });
  });

  describe('selectPurchasePlan()', () => {

    it('should display information about the selected purchase plan', () => {
      let plan = {id: 'abc123'};
      selectPurchasePlan(plan).should.eql({type: SELECT_PURCHASE_PLAN, plan});
    });
  });

  describe('showPurchaseSelectSpace()', () => {

    it('should display the purchase select space screen', () => {
      showPurchaseSelectSpace().should.eql({type: SHOW_PURCHASE_SELECT_SPACE});
    });
  });

  describe('hidePurchaseSelectSpace()', () => {

    it('should hide the purchase select space screen', () => {
      hidePurchaseSelectSpace().should.eql({type: HIDE_PURCHASE_SELECT_SPACE});
    });
  });

  describe('requestFetchPurchaseSpaces()', () => {

    it('should get spaces to display to user when purchasing a service', () => {
      requestFetchPurchaseSpaces().should.eql({type: REQUEST_FETCH_PURCHASE_SPACES});
    });
  });

  describe('updatePurchaseSpaces()', () => {

    it('should update the list of spaces to display to user when purchasing a service', () => {
      let spaces = [{entity: {id: '1'}}, {entity: {id: '2'}}, {entity: {id: '3'}}];
      updatePurchaseSpaces(spaces).should.eql({type: UPDATE_PURCHASE_SPACES, spaces});
    });
  });

  describe('requestPurchaseService()', () => {

    it('should purchase a new service in a selected space', () => {
      let name = 'new-service;';
      let spaceGuid = 'space-abc123';
      let planGuid = 'plan-abc123';

      requestPurchaseService(name, spaceGuid, planGuid).should.eql({
        type: REQUEST_PURCHASE_SERVICE,
        name,
        spaceGuid,
        planGuid
      });
    });
  });

  describe('showPurchaseCompleteScreen()', () => {

    it('should show the purchase complete screen', () => {
      showPurchaseCompleteScreen().should.eql({type: SHOW_PURCHASE_COMPLETE_SCREEN});
    })
  });

  describe('hidePurchaseCompleteScreen()', () => {

    it('should hide the purchase complete screen', () => {
      hidePurchaseCompleteScreen().should.eql({type: HIDE_PURCHASE_COMPLETE_SCREEN});
    })
  });
});
