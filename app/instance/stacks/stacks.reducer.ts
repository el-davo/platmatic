import initialState from '../../initialState';
import {FETCH_STACKS, UPDATE_STACKS} from './stacks.action-types';

export function stacksReducer(state = initialState.stacks, action) {
  switch (action.type) {
    case FETCH_STACKS:
      return {...state, isFetchingStacks: true};
    case UPDATE_STACKS:
      return {...state, result: action.stacks, isFetchingStacks: false};
    default:
      return state;
  }
}
