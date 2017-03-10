import {FETCH_STACKS, UPDATE_STACKS} from './stacks.action-types';

export function fetchStacks() {
  return {type: FETCH_STACKS};
}

export function updateStacks(stacks) {
  return {type: UPDATE_STACKS, stacks};
}

