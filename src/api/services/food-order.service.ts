import { DayMenu, MenuFilter } from '../interfaces/menu';
import { PlateType } from '../interfaces/plate';
import { Order } from '../interfaces/order';

const daysMenuData: DayMenu[] = [
  {
    day: 0,
    plates: [
      {
        id: '1',
        name: 'plate 1',
        type: PlateType.salad,
        hasSideDish: false,
      },
      {
        id: '2',
        name: 'plate 2',
        type: PlateType.salad,
        hasSideDish: false,
      },
      {
        id: '3',
        name: 'plate 3',
        type: PlateType.main,
        hasSideDish: false,
      },
      {
        id: '4',
        name: 'plate 4',
        type: PlateType.main,
        hasSideDish: false,
      },
      {
        id: '5',
        name: 'plate 5',
        type: PlateType.desert,
        hasSideDish: false,
      },
      {
        id: '6',
        name: 'plate 6',
        type: PlateType.desert,
        hasSideDish: false,
      },
    ],
  },
  {
    day: 1,
    plates: [
      {
        id: '1',
        name: 'plate 1',
        type: PlateType.salad,
        hasSideDish: false,
      },
      {
        id: '2',
        name: 'plate 2',
        type: PlateType.salad,
        hasSideDish: false,
      },
      {
        id: '3',
        name: 'plate 3',
        type: PlateType.main,
        hasSideDish: false,
      },
      {
        id: '4',
        name: 'plate 4',
        type: PlateType.main,
        hasSideDish: false,
      },
      {
        id: '5',
        name: 'plate 5',
        type: PlateType.desert,
        hasSideDish: false,
      },
      {
        id: '6',
        name: 'plate 6',
        type: PlateType.desert,
        hasSideDish: false,
      },
    ],
  },
];
const orders: Order[] = [
  {
    user: 'user1',
    plates: [
      {
        id: '1',
        plate: {
          id: '1',
          name: 'plate 1',
          type: PlateType.salad,
          hasSideDish: false,
        },
        count: 1,
      },
    ]
  },
  {
    user: 'user3',
    plates: [
      {
        id: '3',
        plate: {
          id: '3',
          name: 'plate 3',
          type: PlateType.main,
          hasSideDish: false,
        },
        count: 1,
      },
    ]
  },
];

export class FoodOrderService {
  getMenu() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(daysMenuData)
          // reject(new Error('Test Error'))
        }, 1500
      );
    })
  }
  getDayMenu(filter: MenuFilter) {
    const day = 0;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
            day,
          // @ts-ignore
            plates: daysMenuData.find(_ => _.day === day).plates
              .filter(plate => plate.type === filter.type),
          })
          // reject(new Error('Test Error'))
        }, 1500
      );
    })
  }
  getPlateTypes() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(Object.keys(PlateType))
          // reject(new Error('Test Error'))
        }, 1500
      );
    })
  }
  fetchAllOrders() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(orders)
          // reject(new Error('Test Error'))
        }, 1500
      );
    })
  }
  updatePlate() {}
  getOrders() {}
  getOrder() {}
  createOrder() {}
  editOrder() {}
}
