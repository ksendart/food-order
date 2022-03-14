import { SideDish } from './side-dish';

export enum PlateType {
  salad = 'salad',
  main = 'main',
  desert = 'desert',
}

export interface Plate {
  id: string;
  name: string;
  type: PlateType;
  hasSideDish: boolean;
  sideDish?: SideDish[];
}
export interface OrderPlate {
  id: string;
  plate: Plate;
  count: number;
}
