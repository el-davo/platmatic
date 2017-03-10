import initialState from '../../initialState';
import {FETCH_SPACES, UPDATE_SPACES, CLEAR_SPACES} from './spaces.action-types';

export function spacesReducer(state = initialState.spaces, action) {
  switch (action.type) {
    case FETCH_SPACES:
      return {...state, isFetchingSpaces: true};
    case UPDATE_SPACES:
      return {...state, result: action.spaces, isFetchingSpaces: false};
    case CLEAR_SPACES:
      return {...state, result: []};
    default:
      return state;
  }
}
