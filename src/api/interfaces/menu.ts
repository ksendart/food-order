import { Plate } from './plate';

export type DayMenu = {
  day: number,
  plates: Plate[],
}

export type Menu = DayMenu[];
