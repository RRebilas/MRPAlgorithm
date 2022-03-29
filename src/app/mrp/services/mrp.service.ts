import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MrpRecord } from 'src/app/core/models/MrpRecord';

@Injectable({
  providedIn: 'root',
})
export class MrpService {
  private _dataSource$: BehaviorSubject<MrpRecord[]> = new BehaviorSubject(
    <MrpRecord[]>[]
  );

  constructor() {}

  set dataSource(data: MrpRecord[]) {
    this._dataSource$.next(data);
  }

  get dataSource(): MrpRecord[] {
    return this._dataSource$.getValue();
  }

  get dataSource$(): Observable<MrpRecord[]> {
    return this._dataSource$.asObservable();
  }

  setDemand(demand: number[]) {
    const data: MrpRecord[] = demand.map((element, index) => ({
      week: index + 1,
      grossRequirement: element,
    }));
    this.dataSource = data;
  }
}
