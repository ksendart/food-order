import { DayMenu } from '../api/interfaces/menu';

export enum ActionType {
  MENU_LOADED = 'MENU_LOADED',
  DAY_MENU_LOADED = 'DAY_MENU_LOADED',
  MENU_REQUESTED = 'MENU_REQUESTED',
  MENU_ERROR = 'MENU_ERROR',
}

export type Action = {
  type: ActionType;
  payload: any;
}

const menuLoaded = (menu: DayMenu[]): Action => {
  return {
    type: ActionType.MENU_LOADED,
    payload: menu,
  };
}
const dayMenuLoaded = (menu: DayMenu): Action => {
  return {
    type: ActionType.DAY_MENU_LOADED,
    payload: menu,
  };
}
const menuRequested = () => {
  return {
    type: ActionType.MENU_REQUESTED,
  }
}
const menuError = (error: string) => {
  return {
    type: ActionType.MENU_ERROR,
    payload: error,
  }
}

export {
  menuLoaded,
  dayMenuLoaded,
  menuRequested,
  menuError,
};
