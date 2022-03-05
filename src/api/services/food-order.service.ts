import { DayMenu } from '../interfaces/menu';
import { PlateType } from '../interfaces/plate';

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
  getDayMenu(day:number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          resolve(daysMenuData.find(_ => _.day === day))
          // reject(new Error('Test Error'))
        }, 1500
      );
    })
  }
  createPlate() {}
  updatePlate() {}
  getOrders() {}
  getOrder() {}
  createOrder() {}
  editOrder() {}
}
