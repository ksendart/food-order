import { State } from '../api/interfaces/state';
import { Action, ActionType } from '../actions';
import { DayMenu } from '../api/interfaces/menu';
import { Plate } from '../api/interfaces/plate';
import { v1 as uuid1 } from 'uuid';

const addPlateToDayMenu = (dayMenu: DayMenu, plate: Plate): DayMenu => {
  return {
    ...dayMenu,
    plates: [ ...dayMenu.plates, plate],
  };
}

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
    case ActionType.ADD_PLATE_TO_MENU:
      console.log(action.payload);
      const idx = state.admin.daysMenu.findIndex(_ => _.day === action.payload.day);
      const plateId = uuid1();
      if (idx === -1) {
        return {
          ...state.admin,
          daysMenu: [
              ...state.admin.daysMenu,
            { day: action.payload.day, plates: [{ ...action.payload.plate, id: plateId }] },
          ],
        };
      }
      const dayMenu = addPlateToDayMenu(state.admin.daysMenu[idx], { ...action.payload.plate, id: plateId });
      return {
        ...state.admin,
        daysMenu: [
          ...state.admin.daysMenu.slice(0, idx),
          dayMenu,
          ...state.admin.daysMenu.slice(idx + 1),
        ]
      };
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
