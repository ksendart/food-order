import { State, UserState } from '../api/interfaces/state';
import { Action, ActionType } from '../actions';
import { OrderPlate, Plate } from '../api/interfaces/plate';

const updateOrder = (state: UserState, plate: Plate, quantity: number): UserState => {
  const { order: { plates } } = state;
  const cartItemIndex = plates.findIndex((orderPlate) => orderPlate.plate.id === plate.id);
  const cartItem = plates[cartItemIndex];

  const newCartItem = updateCartItem(plate, cartItem, quantity)
  return {
    ...state,
    order: {
      ...state.order,
      plates: updateCartItems(plates, newCartItem, cartItemIndex),
    }
  }
};
const updateCartItems = (cartItems: OrderPlate[], item: OrderPlate, idx: number) => {
  if (item.count === 0) {
    return [
      ...cartItems.slice(0, idx),
      ...cartItems.slice(idx + 1),
    ];
  }
  if (idx !== -1) {
    return [
      ...cartItems.slice(0, idx),
      item,
      ...cartItems.slice(idx + 1),
    ];
  } else {
    return [
      ...cartItems,
      item,
    ];
  }
}
const updateCartItem = (plate: Plate, item: OrderPlate, quantity: number): OrderPlate => {
  return {
    plate,
    id: plate.id,
    count: (item ? item.count : 0) + quantity,
  };
}

const userState = (state: State | undefined, action: Action) => {
  if (state === undefined) {
    return {
      dayMenu: {
        day: 0,
        plates: [],
      },
      plateTypes: [],
      loading: false,
      error: null,
      order: {
        user: 'user1',
        plates: [],
      },
    };
  }
  switch (action.type) {
    case ActionType.ADD_PLATE_TO_ORDER:
      return updateOrder(state.user, action.payload, 1);
    case ActionType.REMOVE_PLATE_TO_ORDER:
      return updateOrder(state.user, action.payload, -1);
    case ActionType.PLATE_TYPES_REQUESTED:
      return {
        ...state.user,
        loading: true,
      }
    case ActionType.PLATE_TYPES_LOADED:
      return {
        ...state.user,
        loading: false,
        plateTypes: action.payload,
      }
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
