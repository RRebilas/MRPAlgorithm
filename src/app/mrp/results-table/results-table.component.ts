import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, debounceTime, Observable, tap } from 'rxjs';
import { MrpRecord } from 'src/app/core/models/MrpRecord';
import { MrpService } from '../services/mrp.service';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss'],
})
export class ResultsTableComponent implements OnInit {
  przewidywaneNaStanie: number[] = [];
  public form: FormGroup = this._fb.group({
    czasRealizacji: [1, Validators.min(0)],
    wielkoscPartii: [1, Validators.min(1)],
    naStanie: [0, Validators.min(0)],
    planowanePrzyjecia: this._fb.array([]),
  });
  dataSource$: Observable<MrpRecord[]>;

  constructor(
    private readonly _mrpService: MrpService,
    private readonly _fb: FormBuilder
  ) {
    this.dataSource$ = this._mrpService.dataSource$.pipe(
      tap((data) => {
        data.map((element) => {
          this.dodajPlanowanePrzyjecie(element.week);
        });
      })
    );
  }

  ngOnInit(): void {
    const valueChange$ = this.form.valueChanges;
    combineLatest([valueChange$, this.dataSource$])
      .pipe(debounceTime(300))
      .subscribe((result) => {
        // const przewidywaneNaStanie: number[] = [];
        // const zapotrzebowanie = result[1].map(
        //   (element) => element.grossRequirement
        // );
        // zapotrzebowanie.reduce((prev, curr, index) => {
        //   const res =
        //     prev - curr + result[0].planowanePrzyjecia[index].planowanePrzyjecia;
        //   przewidywaneNaStanie.push(res);
        //   return res;
        // }, result[0].naStanie);
        // this.przewidywaneNaStanie = przewidywaneNaStanie;
        this._mrpService.calculations(result);
      });
  }

  stworzPlanowanePrzyjecia(): FormGroup {
    return this._fb.group({
      planowanePrzyjecia: [0, Validators.min(0)],
    });
  }

  get planowanePrzyjecia(): FormArray {
    return this.form.get('planowanePrzyjecia') as FormArray;
  }

  dodajPlanowanePrzyjecie(week: number) {
    this.planowanePrzyjecia.insert(week, this.stworzPlanowanePrzyjecia());
  }

  displayedColumns: string[] = [
    'mrp-week',
    'mrp-grossRequirements',
    'mrp-scheduled',
    'mrp-available',
    'mrp-nettRequirements',
    'mrp-plannedOrderReceipts',
    'mrp-plannedOrderRelease',
  ];
}
