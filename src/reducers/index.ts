import { Action, ActionType } from '../actions';
import { State } from '../api/interfaces/state';

const initialState: State = {
  menu: {
    daysMenu: [],
    loading: false,
    error: null,
  },
  orders: [],
  order: null,
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.MENU_LOADED:
      return {
        ...state,
        menu: {
          daysMenu: action.payload,
          loading: false,
          error: null,
        },
      };
    case ActionType.MENU_REQUESTED:
      return {
        ...state,
        menu: {
          daysMenu: [],
          loading: true,
          error: null,
        },
      };
    case ActionType.MENU_ERROR:
      return {
        ...state,
        menu: {
          daysMenu: [],
          loading: false,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}

export default reducer;
