import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest, debounceTime, Observable } from 'rxjs';
import { MrpRecord } from 'src/app/core/models/MrpRecord';
import { GhpFormService } from '../services/ghp-form.service';
import { MrpService } from '../services/mrp.service';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss'],
})
export class ResultsTableComponent implements OnInit {
  przewidywaneNaStanie: number[] = [];
  public form: FormGroup = this._fb.group({
    czasRealizacji: [3, Validators.min(0)],
    wielkoscPartii: [25, Validators.min(1)],
    naStanie: [30, Validators.min(0)],
    planowanePrzyjecia: this._fb.array([]),
  });
  dataSource$: Observable<MrpRecord[]>;

  constructor(
    private readonly _mrpService: MrpService,
    private readonly _ghpFormService: GhpFormService,
    private readonly _fb: FormBuilder
  ) {
    this.dataSource$ = this._mrpService.dataSource$;
    this._mrpService.addNewRow$.subscribe((week) => {
      this.dodajPlanowanePrzyjecie(week);
    });
  }

  ngOnInit(): void {
    const valueChange$ = this.form.valueChanges;
    const anotherValue$ = this._ghpFormService.ghpForm.valueChanges;

    combineLatest([valueChange$, anotherValue$])
      .pipe(debounceTime(300))
      .subscribe((result) => {
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
