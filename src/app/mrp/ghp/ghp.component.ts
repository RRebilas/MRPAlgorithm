import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ExampleDataSource, PeriodicElement } from './ExampleDataSource';

export let ELEMENT_DATA: PeriodicElement[] = [
  { week: 1, demand: 5, available: 15 },
];

@Component({
  selector: 'app-ghp',
  templateUrl: './ghp.component.html',
  styleUrls: ['./ghp.component.scss'],
})
export class GhpComponent implements OnInit {
  displayedColumns: string[] = ['week', 'demand', 'production', 'available'];

  dataToDisplay = [...ELEMENT_DATA];

  dataSource = new ExampleDataSource(this.dataToDisplay);

  demand = new FormControl(0, [Validators.min(0)]);
  inStock = new FormControl(0, [Validators.min(0)]);

  currentWeek: number | undefined;

  ngOnInit() {
    this.demand.valueChanges.subscribe((week) => {
      ELEMENT_DATA = ELEMENT_DATA.map((el) =>
        el.week === this.currentWeek ? { ...el, demand: parseInt(week) } : el
      );
      console.log(ELEMENT_DATA);
    });
  }

  addData() {
    const element: PeriodicElement = {
      week: this.dataToDisplay.length + 1,
      demand: 0,
      available: 0,
    };
    this.dataToDisplay = [...this.dataToDisplay, element];
    this.dataSource.setData(this.dataToDisplay);
  }

  removeData() {
    this.dataToDisplay = this.dataToDisplay.slice(0, -1);
    this.dataSource.setData(this.dataToDisplay);
  }

  selectWeek(week: number) {
    this.currentWeek = week;
  }
}
