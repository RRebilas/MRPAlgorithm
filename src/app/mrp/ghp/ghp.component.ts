import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { GhpFormService } from '../services/ghp-form.service';
import { GhpService } from '../services/ghp.service';
import { MrpService } from '../services/mrp.service';
import { ExampleDataSource, PeriodicElement } from './ExampleDataSource';

@Component({
  selector: 'app-ghp',
  templateUrl: './ghp.component.html',
  styleUrls: ['./ghp.component.scss'],
})
export class GhpComponent implements OnInit {
  displayedColumns: string[] = ['week', 'demand', 'production'];
  dataToDisplay: PeriodicElement[] = [];
  dataSource = new ExampleDataSource(this.dataToDisplay);
  currentWeek: number | undefined;
  formGroup = this._ghpFormService.ghpForm;
  totalDemand$: Observable<number[]> | undefined;

  constructor(
    private readonly _ghpFormService: GhpFormService,
    private readonly _ghpService: GhpService,
    private readonly _mrpService: MrpService
  ) {}

  ngOnInit() {
    this.formGroup.valueChanges
      .pipe(switchMap((val) => this._ghpService.calculateGhp(val)))
      .subscribe((val) => this._mrpService.setDemand(val));
  }

  addData() {
    const week = this.dataToDisplay.length + 1;
    const element: PeriodicElement = {
      week,
      demand: 0,
      available: 0,
    };
    this.dataToDisplay = [...this.dataToDisplay, element];
    this.dataSource.setData(this.dataToDisplay);
    this._ghpFormService.addGhpRecord(week);
  }

  removeData() {
    this.dataToDisplay = this.dataToDisplay.slice(0, -1);
    this.dataSource.setData(this.dataToDisplay);
    this._ghpFormService.removeGhpRecord(this.dataToDisplay.length - 1);
  }
}
