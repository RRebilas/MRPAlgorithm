import { Component, OnInit } from '@angular/core';
import { MrpRecord } from 'src/app/core/models/MrpRecord';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss'],
})
export class ResultsTableComponent implements OnInit {
  public dataSource: Array<MrpRecord> = [
    {
      week: 1,
      grossRequirement: 10,
      scheduled: 0,
      available: 20,
      nettRequirements: 0,
      plannedOrderReceipts: 0,
      plannedOrderRelease: 0,
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
