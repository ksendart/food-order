import { DayMenu, MenuFilter } from '../interfaces/menu';
import { PlateType } from '../interfaces/plate';
import { Order } from '../interfaces/order';
import { SideDishType } from '../interfaces/side-dish';
import { v1 as uuid1 } from 'uuid';

const daysMenuData: DayMenu[] = [
  {
    day: 0,
    plates: [
      {
        id: uuid1(),
        name: 'plate 1',
        type: PlateType.salad,
        hasSideDish: false,
      },
      {
        id: uuid1(),
        name: 'plate 2',
        type: PlateType.salad,
        hasSideDish: true,
        sideDish: [
          { id: '021', name: 'sideDish 1', type: SideDishType.sauce },
          { id: '022', name: 'sideDish 2', type: SideDishType.sauce },
        ]
      },
      {
        id: uuid1(),
        name: 'plate 3',
        type: PlateType.main,
        hasSideDish: false,
      },
      {
        id: uuid1(),
        name: 'plate 4',
        type: PlateType.main,
        hasSideDish: true,
        sideDish: [
          { id: '041', name: 'sideDish 1', type: SideDishType.garnish },
          { id: '042', name: 'sideDish 2', type: SideDishType.garnish },
        ]
      },
      {
        id: uuid1(),
        name: 'plate 5',
        type: PlateType.desert,
        hasSideDish: false,
      },
      {
        id: uuid1(),
        name: 'plate 6',
        type: PlateType.desert,
        hasSideDish: true,
        sideDish: [
          { id: '061', name: 'sideDish 1', type: SideDishType.topping },
          { id: '062', name: 'sideDish 2', type: SideDishType.topping },
        ]
      },
    ],
  },
  {
    day: 1,
    plates: [
      {
        id: uuid1(),
        name: 'plate 1',
        type: PlateType.salad,
        hasSideDish: false,
      },
      {
        id: uuid1(),
        name: 'plate 2',
        type: PlateType.salad,
        hasSideDish: false,
      },
      {
        id: uuid1(),
        name: 'plate 3',
        type: PlateType.main,
        hasSideDish: false,
      },
      {
        id: uuid1(),
        name: 'plate 4',
        type: PlateType.main,
        hasSideDish: false,
      },
      {
        id: uuid1(),
        name: 'plate 5',
        type: PlateType.desert,
        hasSideDish: false,
      },
      {
        id: uuid1(),
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
        id: uuid1(),
        plate: {
          id: uuid1(),
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
        id: uuid1(),
        plate: {
          id: uuid1(),
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
