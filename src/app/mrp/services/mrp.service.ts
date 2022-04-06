import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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
  public addNewRow$: Subject<number> = new Subject();
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
      okres: index + 1,
      calkowiteZapotrzebowanie: 0,
      planowanePrzyjecia: 0,
      przewidywaneNaStanie: 0,
      zapotrzebowanieNetto: 0,
      planowaneZamowienia: 0,
      planowanePrzyjecieZamowien: 0,
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
          ? { ...p, calkowiteZapotrzebowanie: zapotrzebowanie ?? 0 }
          : p
      );
      this.dataSource = data;
    }
  }

  calculations(forms: [any, MrpRecord[]]) {
    const [mrp, ghp] = forms;

    const rekordy: MrpRecord[] = [];
    this.dataSource.reduce(
      (prev, curr, index) => {
        let przewidywaneNaStanie =
          prev.przewidywaneNaStanie -
          curr.calkowiteZapotrzebowanie +
          mrp.planowanePrzyjecia[index].planowanePrzyjecia;
        let planowanePrzyjecieZamowien;
        if (przewidywaneNaStanie < 0 && rekordy[index - mrp.czasRealizacji]) {
          console.log(rekordy[index - mrp.czasRealizacji]);
          rekordy[index - mrp.czasRealizacji].planowaneZamowienia =
            mrp.wielkoscPartii;
          planowanePrzyjecieZamowien = mrp.wielkoscPartii;
          przewidywaneNaStanie += mrp.wielkoscPartii;
        } else {
        }
        const zapotrzebowanieNetto = planowanePrzyjecieZamowien
          ? planowanePrzyjecieZamowien - przewidywaneNaStanie
          : 0;
        const wynik = {
          okres: curr.okres,
          calkowiteZapotrzebowanie: curr.calkowiteZapotrzebowanie,
          planowanePrzyjecia: mrp.planowanePrzyjecia[index].planowanePrzyjecia,
          przewidywaneNaStanie,
          zapotrzebowanieNetto,
          planowaneZamowienia: curr.planowaneZamowienia,
          planowanePrzyjecieZamowien: planowanePrzyjecieZamowien ?? 0,
        };
        rekordy.push(wynik);
        return wynik;
      },
      { przewidywaneNaStanie: mrp.naStanie } as MrpRecord
    );
    this.dataSource = rekordy;
  }
}
