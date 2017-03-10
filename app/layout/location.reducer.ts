import initialState from '../initialState';
import {LOCATION_CHANGE} from 'react-router-redux';

export function locationReducer(state = initialState.activePage, action) {
  switch (action.type) {
    case LOCATION_CHANGE:
      let pathname = action.payload.pathname;
      let page;

      if (!pathname || pathname === '/') {
        page = 'home';
      } else {
        let [,route] = pathname.split('/');
        page = route;
      }

      return page;
    default:
      return state;
  }
}


