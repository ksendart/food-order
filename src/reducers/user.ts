import { State } from '../api/interfaces/state';
import { Action, ActionType } from '../actions';

const userState = (state: State | undefined, action: Action) => {
  if (state === undefined) {
    return {
      dayMenu: {
        day: 0,
        plates: [],
      },
      loading: false,
      error: null,
      order: null,
    };
  }
  switch (action.type) {
    case ActionType.DAY_MENU_LOADED:
      return {
        ...state.user,
        dayMenu: action.payload,
        loading: false,
        error: null,
      };
    case ActionType.MENU_REQUESTED:
      return {
        ...state.user,
        dayMenu: {
          day: 0,
          plates: [],
        },
        loading: true,
        error: null,
      };
    case ActionType.MENU_ERROR:
      return {
        ...state.user,
        dayMenu: {
          day: 0,
          plates: [],
        },
        loading: false,
        error: action.payload,
      };
    default:
      return state.user;
  }
}

export default userState;
