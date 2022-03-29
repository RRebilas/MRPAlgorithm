import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface GHPRecord {
  demand: number;
  production?: number;
}

interface FormObject {
  inStock: number;
  ghpRecords: GHPRecord[];
}

@Injectable({
  providedIn: 'root',
})
export class GhpService {
  private _totalDemand: BehaviorSubject<number[]> = new BehaviorSubject(
    <number[]>[]
  );

  constructor() {}

  get totalDemand$(): Observable<number[]> {
    return this._totalDemand;
  }

  set totalDemand(demand: number[]) {
    this._totalDemand.next(demand);
  }

  calculateGhp(data: FormObject): Observable<number[]> {
    const totalDemand: GHPRecord[] = [];
    data.ghpRecords.reduce(
      (prev, curr) => {
        const result = prev.demand - curr.demand + (curr.production ?? 0);
        totalDemand.push({ demand: result });
        return { demand: result };
      },
      { demand: data.inStock }
    );
    this.totalDemand = totalDemand.map((record) => record.demand);
    return this.totalDemand$;
  }
}
