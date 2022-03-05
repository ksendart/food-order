import { DayMenu } from './menu';
import { Order } from './order';

export interface AdminState {
  daysMenu: DayMenu[],
  loading: boolean,
  error: string | null,
  orders: Order[],
}

export interface UserState {
  dayMenu: DayMenu,
  loading: boolean,
  error: string | null,
  order: Order | null,
}

export interface State {
  admin: AdminState,
  user: UserState,
}
