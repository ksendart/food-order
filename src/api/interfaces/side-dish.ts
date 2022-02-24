export enum SideDishType {
  sauce = 'sauce',
  garnish = 'garnish',
  topping = 'topping',
}

export interface SideDish {
  id: string;
  name: string;
  type: SideDishType;
}
