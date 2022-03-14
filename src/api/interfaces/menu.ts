import { Plate, PlateType } from './plate';

export interface MenuFilter {
  type?: PlateType,
}

export type DayMenu = {
  day: number,
  plates: Plate[],
}

export type Menu = DayMenu[];
