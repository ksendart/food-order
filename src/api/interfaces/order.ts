import { OrderPlate } from './plate';

export interface Order {
  plates: OrderPlate[];
  user: string;
  error?: string | null;
}
