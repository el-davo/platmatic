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

export function marketReducer(state: any = initialState.market, action: any) {
  switch (action.type) {
    case FETCH_MARKET_ASSETS:
      return {...state, isFetchingMarketAssets: true, page: action.page};
    case ADD_MARKET_ASSETS:
      return {
        ...state,
        isFetchingMarketAssets: false,
        assets: [...state.assets, ...action.assets.resources],
        totalPages: action.assets.total_pages
      };
    case CLEAR_MARKET_ASSETS:
      return {...state, assets: [], page: 1};
    case REQUEST_FETCH_PURCHASE_PLANS:
      return {
        ...state,
        purchasePlans: {
          ...state.purchasePlans,
          page: action.page,
          service: action.service,
          showPurchaseOverlay: true,
          isFetchingPurchaseInfo: true,
          plans: []
        }
      };
    case ADD_PURCHASE_PLANS:
      return {
        ...state,
        purchasePlans: {
          ...state.purchasePlans,
          isFetchingPurchaseInfo: false,
          plans: [...state.purchasePlans.plans, ...action.plans]
        }
      };
    case REQUEST_PURCHASE_PLANS_FAILED:
      return {
        ...state,
        purchasePlans: {...state.purchasePlans, isFetchingPurchaseInfo: false, showPurchaseOverlay: false, plans: []}
      };
    case CLOSE_PURCHASE_PLANS:
      return {
        ...state,
        purchasePlans: {
          ...state.purchasePlans,
          isFetchingPurchaseInfo: false,
          showPurchaseOverlay: false,
          plans: [],
          selectedPurchasePlan: {},
          showPurchaseSelectSpace: false,
          showPurchaseCompleteScreen: false
        }
      };
    case SELECT_PURCHASE_PLAN:
      return {
        ...state,
        purchasePlans: {
          ...state.purchasePlans,
          selectedPurchasePlan: action.plan,
          isFetchingSpaces: false,
          showPurchaseSelectSpace: false
        }
      };
    case SHOW_PURCHASE_SELECT_SPACE:
      return {...state, purchasePlans: {...state.purchasePlans, showPurchaseSelectSpace: true}};
    case HIDE_PURCHASE_SELECT_SPACE:
      return {...state, purchasePlans: {...state.purchasePlans, showPurchaseSelectSpace: false}};
    case REQUEST_FETCH_PURCHASE_SPACES:
      return {...state, purchasePlans: {...state.purchasePlans, isFetchingSpaces: true}};
    case UPDATE_PURCHASE_SPACES:
      return {...state, purchasePlans: {...state.purchasePlans, spaces: action.spaces, isFetchingSpaces: false}};
    case REQUEST_PURCHASE_SERVICE:
      return {...state, purchasePlans: {...state.purchasePlans, isPurchasingService: true}};
    case SHOW_PURCHASE_COMPLETE_SCREEN:
      return {
        ...state,
        purchasePlans: {...state.purchasePlans, showPurchaseCompleteScreen: true, isPurchasingService: false}
      };
    case HIDE_PURCHASE_COMPLETE_SCREEN:
      return {...state, purchasePlans: {...state.purchasePlans, showPurchaseCompleteScreen: false}};
    default:
      return state;
  }
}
