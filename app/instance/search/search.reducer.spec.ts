import {
  SHOW_SEARCH_OVERLAY,
  HIDE_SEARCH_OVERLAY,
  UPDATE_APP_SEARCH_RESULTS,
  UPDATE_SPACE_SEARCH_RESULTS,
  UPDATE_MARKET_SEARCH_RESULTS,
  INVALIDATE_SEARCH_CACHE,
  ADD_TO_APP_SEARCH_CACHE,
  ADD_TO_MARKET_SEARCH_CACHE
} from './search.action-types';
import {searchReducer} from './search.reducer';
import initialState from '../../initialState';

describe('Search Reducer', () => {

  describe('SHOW_SEARCH_OVERLAY', () => {

    it('should show the search overlay', () => {
      let action = {type: SHOW_SEARCH_OVERLAY};
      let state = {...initialState.search, showSearchOverlay: false};

      searchReducer(state, action).should.eql({...state, showSearchOverlay: true});
    });
  });

  describe('HIDE_SEARCH_OVERLAY', () => {

    it('should hide the search overlay', () => {
      let action = {type: HIDE_SEARCH_OVERLAY};
      let state = {...initialState.search, showSearchOverlay: true};

      searchReducer(state, action).should.eql({...state, showSearchOverlay: false});
    });
  });

  describe('UPDATE_APP_SEARCH_RESULTS', () => {

    it('should update the app search results', () => {
      let action = {type: UPDATE_APP_SEARCH_RESULTS, results: [{}, {}, {}]};
      let state = {...initialState.search, appResults: [{}]};

      searchReducer(state, action).should.eql({...state, appResults: [{}, {}, {}]});
    });
  });

  describe('UPDATE_SPACE_SEARCH_RESULTS', () => {

    it('should update the space search results', () => {
      let action = {type: UPDATE_SPACE_SEARCH_RESULTS, results: [{}, {}, {}]};
      let state = {...initialState.search, spacesResults: [{}]};

      searchReducer(state, action).should.eql({...state, spacesResults: [{}, {}, {}]});
    });
  });

  describe('UPDATE_MARKET_SEARCH_RESULTS', () => {

    it('should update the market search results', () => {
      let action = {type: UPDATE_MARKET_SEARCH_RESULTS, results: [{}, {}, {}]};
      let state = {...initialState.search, marketResults: [{}]};

      searchReducer(state, action).should.eql({...state, marketResults: [{}, {}, {}]});
    });
  });

  describe('INVALIDATE_SEARCH_CACHE', () => {

    it('should clear the search cache', () => {
      let action = {type: INVALIDATE_SEARCH_CACHE};
      let state = {
        ...initialState.search,
        cache: {...initialState.search.cache, apps: [{}], spaces: [{}, {}], market: [{}, {}, {}]}
      };

      searchReducer(state, action).should.eql({...state, cache: {...state.cache, apps: [], spaces: [], market: []}});
    });
  });

  describe('ADD_TO_APP_SEARCH_CACHE', () => {

    it('should add to the app search cache', () => {
      let action = {type: ADD_TO_APP_SEARCH_CACHE, apps: [{}, {}]};
      let state = {
        ...initialState.search,
        cache: {...initialState.search.cache, apps: [{}]}
      };

      searchReducer(state, action).should.eql({...state, cache: {...state.cache, apps: [{}, {}, {}]}});
    });
  });

  describe('ADD_TO_MARKET_SEARCH_CACHE', () => {

    it('should add to the market search cache', () => {
      let action = {type: ADD_TO_MARKET_SEARCH_CACHE, market: [{}, {}]};
      let state = {
        ...initialState.search,
        cache: {...initialState.search.cache, market: [{}]}
      };

      searchReducer(state, action).should.eql({...state, cache: {...state.cache, market: [{}, {}, {}]}});
    });
  });
});
