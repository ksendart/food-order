import { Plate } from './plate';

export interface Order {
  plates: Plate[];
  user: string;
}
