import { DayMenu } from './menu';
import { Order } from './order';
import { PlateType } from './plate';

export interface AdminState {
  daysMenu: DayMenu[],
  loading: boolean,
  error: string | null,
  orders: Order[],
}

export interface UserState {
  dayMenu: DayMenu,
  plateTypes: PlateType[],
  loading: boolean,
  error: string | null,
  order: Order,
}

export interface State {
  admin: AdminState,
  user: UserState,
}
