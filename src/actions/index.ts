export enum ActionType {
  MENU_LOADED = 'MENU_LOADED',
}

export type Action = {
  type: ActionType;
  payload: any;
}

const menuLoaded = (menu: any[]): Action => {
  return {
    type: ActionType.MENU_LOADED,
    payload: menu,
  };
}

export {
  menuLoaded,
};
