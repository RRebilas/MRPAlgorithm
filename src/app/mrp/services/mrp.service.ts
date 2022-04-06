import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MrpRecord } from 'src/app/core/models/MrpRecord';

interface FormObject {
  inStock: number;
  czasRealizacji: number;
  ghpRecords: { demand: number; production: number }[];
}

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

  calculate(form: FormObject) {
    this.dataSource = form.ghpRecords.map((_, index) => ({
      week: index + 1,
      grossRequirement: 0,
    }));

    form.ghpRecords.forEach((el, index) => {
      if (el.production !== 0) {
        this.setProduction(form.czasRealizacji, index, el.production);
      }
    });
  }

  setProduction(
    czasRealizacji: number,
    index: number,
    zapotrzebowanie: number
  ) {
    let data: MrpRecord[];
    if (this.dataSource[index - czasRealizacji]) {
      data = this.dataSource.map((p, idx) =>
        idx === index - czasRealizacji
          ? { ...p, grossRequirement: zapotrzebowanie ?? 0 }
          : p
      );
    } else {
      data = this.dataSource;
      data[0].plannedOrderRelease = zapotrzebowanie;
    }
    this.dataSource = data;
  }

  calculations(result: [any, MrpRecord[]]) {
    this.przewidywaneNaStanie(result[0].naStanie, result[0].planowanePrzyjecia);
  }

  przewidywaneNaStanie(naStanie: number, planowanePrzyjecia: any[]) {
    const przewidywaneNaStanie: number[] = [];
    this.dataSource
      .map((x) => x.grossRequirement)
      .reduce((prev, curr, index) => {
        const res = prev - curr + planowanePrzyjecia[index].planowanePrzyjecia;
        przewidywaneNaStanie.push(res);
        return res;
      }, naStanie);
    this.dataSource = this.dataSource.map((el, idx) => ({
      ...el,
      available: przewidywaneNaStanie[idx],
    }));
  }

  planowaneZamowienia(batchSize: number = 10) {
    const indexes = [];
    this.dataSource
      .map((x) => x.available)
      .map((el, index) => {
        if (el! < 0) {
          indexes.push(index);
        }
      });
  }
}
