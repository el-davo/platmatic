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

export function fetchMarketAssets(page) {
  return {type: FETCH_MARKET_ASSETS, page};
}

export function addMarketAssets(assets) {
  return {type: ADD_MARKET_ASSETS, assets};
}

export function clearMarketAssets() {
  return {type: CLEAR_MARKET_ASSETS};
}

export function requestFetchPurchasePlans(service, page = 1) {
  return {type: REQUEST_FETCH_PURCHASE_PLANS, page, service};
}

export function addPurchasePlans(plans) {
  return {type: ADD_PURCHASE_PLANS, plans};
}

export function requestPurchasePlansFailed() {
  return {type: REQUEST_PURCHASE_PLANS_FAILED};
}

export function closePurchasePlans() {
  return {type: CLOSE_PURCHASE_PLANS};
}

export function selectPurchasePlan(plan) {
  return {type: SELECT_PURCHASE_PLAN, plan};
}

export function showPurchaseSelectSpace() {
  return {type: SHOW_PURCHASE_SELECT_SPACE};
}

export function hidePurchaseSelectSpace() {
  return {type: HIDE_PURCHASE_SELECT_SPACE};
}

export function requestFetchPurchaseSpaces() {
  return {type: REQUEST_FETCH_PURCHASE_SPACES};
}

export function updatePurchaseSpaces(spaces) {
  return {type: UPDATE_PURCHASE_SPACES, spaces};
}

export function requestPurchaseService(name, spaceGuid, planGuid) {
  return {type: REQUEST_PURCHASE_SERVICE, name, spaceGuid, planGuid};
}

export function showPurchaseCompleteScreen() {
  return {type: SHOW_PURCHASE_COMPLETE_SCREEN};
}

export function hidePurchaseCompleteScreen() {
  return {type: HIDE_PURCHASE_COMPLETE_SCREEN};
}
