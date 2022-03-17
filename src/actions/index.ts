import { DayMenu } from '../api/interfaces/menu';
import { Plate, PlateType } from '../api/interfaces/plate';

export enum ActionType {
  MENU_LOADED = 'MENU_LOADED',
  DAY_MENU_LOADED = 'DAY_MENU_LOADED',
  MENU_REQUESTED = 'MENU_REQUESTED',
  MENU_ERROR = 'MENU_ERROR',
  PLATE_TYPES_REQUESTED = 'PLATE_TYPES_REQUESTED',
  PLATE_TYPES_LOADED = 'PLATE_TYPES_LOADED',
  ADD_PLATE_TO_ORDER = 'ADD_PLATE_TO_ORDER',
  REMOVE_PLATE_TO_ORDER = 'REMOVE_PLATE_TO_ORDER',
  AUTHORIZED = 'AUTHORIZED',
  UNAUTHORIZED = 'UnAUTHORIZED',
}

export type Action = {
  type: ActionType;
  payload: any;
}

const authorized = (login: string, role: string) => {
  return {
    type: ActionType.AUTHORIZED,
    payload: { login, role },
  }
}
const unauthorized = () => {
  return {
    type: ActionType.UNAUTHORIZED,
  }
}
const plateTypesRequested = () => {
  return {
    type: ActionType.PLATE_TYPES_REQUESTED
  }
}
const plateTypesLoaded = (plateTypes: PlateType[]) => {
  return {
    type: ActionType.PLATE_TYPES_LOADED,
    payload: plateTypes,
  }
}
const addPlateToOrder = (plate: Plate) => {
  return {
    type: ActionType.ADD_PLATE_TO_ORDER,
    payload: plate,
  }
}
const removePlateFromOrder = (plate: Plate) => {
  return {
    type: ActionType.REMOVE_PLATE_TO_ORDER,
    payload: plate,
  }
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
    type: ActionType.MENU_REQUESTED
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
  plateTypesLoaded,
  plateTypesRequested,
  addPlateToOrder,
  removePlateFromOrder,
  authorized,
  unauthorized,
};
