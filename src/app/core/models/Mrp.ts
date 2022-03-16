import { MrpRecord } from './MrpRecord';

export interface Mrp {
  record?: MrpRecord[];
  realizationTime: number;
  batchSize: number;
  inStock: number;
}
