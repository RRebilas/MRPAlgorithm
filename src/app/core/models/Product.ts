export enum AvailableLevels {
  'zero' = 0,
  'one' = 1,
  'two' = 2,
}

export interface Product {
  name: string;
  level: AvailableLevels;
  children?: Product[];
}
