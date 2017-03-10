import {
  SHOW_SEARCH_OVERLAY,
  HIDE_SEARCH_OVERLAY,
  REQUEST_SEARCH,
  UPDATE_APP_SEARCH_RESULTS,
  UPDATE_SPACE_SEARCH_RESULTS,
  UPDATE_MARKET_SEARCH_RESULTS,
  INVALIDATE_SEARCH_CACHE,
  REQUEST_SEARCH_CACHE,
  ADD_TO_APP_SEARCH_CACHE,
  ADD_TO_MARKET_SEARCH_CACHE
} from './search.action-types';
import {
  showSearchOverlay,
  hideSearchOverlay,
  requestSearch,
  updateAppSearchResults,
  updateSpaceSearchResults,
  updateMarketSearchResults,
  invalidateSearchCache,
  requestSearchCache,
  addToAppSearchCache,
  addToMarketSearchCache
} from './search.actions';

describe('Search Actions', () => {

  describe('showSearchOverlay()', () => {

    it('should show the search overlay', () => {
      showSearchOverlay().should.eql({type: SHOW_SEARCH_OVERLAY});
    });
  });

  describe('hideSearchOverlay()', () => {

    it('should hide the search overlay', () => {
      hideSearchOverlay().should.eql({type: HIDE_SEARCH_OVERLAY});
    });
  });

  describe('requestSearch()', () => {

    it('should search for a new term in cloud foundry', () => {
      requestSearch('abc123').should.eql({type: REQUEST_SEARCH, searchTerm: 'abc123'});
    });
  });

  describe('updateAppSearchResults()', () => {

    it('should update the search results', () => {
      updateAppSearchResults([{}, {}, {}]).should.eql({type: UPDATE_APP_SEARCH_RESULTS, results: [{}, {}, {}]});
    });
  });

  describe('updateSpaceSearchResults()', () => {

    it('should update the space search results', () => {
      updateSpaceSearchResults([{}, {}, {}]).should.eql({type: UPDATE_SPACE_SEARCH_RESULTS, results: [{}, {}, {}]});
    });
  });

  describe('updateMarketSearchResults()', () => {

    it('should update market search results', () => {
      updateMarketSearchResults([{}, {}, {}]).should.eql({type: UPDATE_MARKET_SEARCH_RESULTS, results: [{}, {}, {}]});
    });
  });

  describe('invalidateSearchCache()', () => {

    it('should clear the search cache', () => {
      invalidateSearchCache().should.eql({type: INVALIDATE_SEARCH_CACHE});
    });
  });

  describe('requestSearchCache()', () => {

    it('should populate the app search cache', () => {
      requestSearchCache(2).should.eql({type: REQUEST_SEARCH_CACHE, page: 2});
    });

    it('should default to page 1 if no page is supplied', () => {
      requestSearchCache().should.eql({type: REQUEST_SEARCH_CACHE, page: 1});
    });
  });

  describe('addToAppSearchCache()', () => {

    it('should add to the app search cache', () => {
      addToAppSearchCache([{}, {}, {}]).should.eql({type: ADD_TO_APP_SEARCH_CACHE, apps: [{}, {}, {}]})
    });
  });

  describe('addToMarketSearchCache()', () => {

    it('should add to the market search cache', () => {
      addToMarketSearchCache([{}, {}, {}]).should.eql({type: ADD_TO_MARKET_SEARCH_CACHE, market: [{}, {}, {}]});
    });
  });
});
