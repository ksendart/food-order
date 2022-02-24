import { Action, ActionType } from '../actions';

const initialState = {
  menu: [],
  orders: [],
  order: [],
};

const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.MENU_LOADED:
      return {
        ...state,
        menu: action.payload,
      };
    default:
      return state;
  }
}

export default reducer;
