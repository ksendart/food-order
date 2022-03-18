import { State } from '../api/interfaces/state';
import { Action, ActionType } from '../actions';

const adminState = (state: State | undefined, action: Action) => {
  if (state === undefined) {
    return {
      daysMenu: [],
      loading: false,
      error: null,
      orders: [],
    };
  }
  switch (action.type) {
    case ActionType.ORDERS_REQUESTED:
      return {
        ...state.admin,
        loading: true,
      };
    case ActionType.ORDERS_LOADED:
      return {
        ...state.admin,
        orders: action.payload,
        loading: false,
      };
    case ActionType.MENU_LOADED:
      return {
        ...state.admin,
        daysMenu: action.payload,
        loading: false,
        error: null,
      };
    case ActionType.MENU_REQUESTED:
      return {
        ...state.admin,
        daysMenu: [],
        loading: true,
        error: null,
      };
    case ActionType.MENU_ERROR:
      return {
        ...state.admin,
        daysMenu: [],
        loading: false,
        error: action.payload,
      };
    default:
      return state.admin;
  }
}

export default adminState;
