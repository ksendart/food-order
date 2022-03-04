import { DayMenu } from './menu';
import { Order } from './order';

export interface State {
  menu: {
    daysMenu: DayMenu[],
    loading: boolean,
    error: string | null,
  },
  orders: Order[],
  order: Order | null,
}
