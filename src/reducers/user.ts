import { State, UserState } from '../api/interfaces/state';
import { Action, ActionType } from '../actions';
import { OrderPlate, Plate } from '../api/interfaces/plate';
import _ from 'lodash';

const updateOrder = (state: UserState, plate: Plate, quantity: number): UserState => {
  const { order: { plates } } = state;
  const orderPlateIndex = plates.findIndex((orderPlate) =>
    orderPlate.plate.id === plate.id &&
    (!plate.hasSideDish || (orderPlate.plate.hasSideDish && _.isEqual(plate.sideDish, orderPlate.plate.sideDish)))
  );
  const orderPlate = plates[orderPlateIndex];

  const newOrderPLate = updateOrderPlate(plate, orderPlate, quantity)
  return {
    ...state,
    order: {
      ...state.order,
      plates: updateOrderPlates(plates, newOrderPLate, orderPlateIndex),
    }
  }
};
const updateOrderPlates = (orderplates: OrderPlate[], orderPlate: OrderPlate, idx: number) => {
  if (orderPlate.count === 0) {
    return [
      ...orderplates.slice(0, idx),
      ...orderplates.slice(idx + 1),
    ];
  }
  if (idx !== -1) {
    return [
      ...orderplates.slice(0, idx),
      orderPlate,
      ...orderplates.slice(idx + 1),
    ];
  } else {
    return [
      ...orderplates,
      orderPlate,
    ];
  }
}
const updateOrderPlate = (plate: Plate, orderPlate: OrderPlate, quantity: number): OrderPlate => {
  return {
    plate,
    id: plate.id,
    count: (orderPlate ? orderPlate.count : 0) + quantity,
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
