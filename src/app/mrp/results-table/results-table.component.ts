import { Component } from '@angular/core';
import { MrpRecord } from 'src/app/core/models/MrpRecord';

const ELEMENT_DATA: MrpRecord[] = [
  {
    week: 1,
    grossRequirement: 10,
    scheduled: 0,
    available: 20,
    nettRequirements: 0,
    plannedOrderReceipts: 0,
    plannedOrderRelease: 0,
  },
  {
    week: 2,
    grossRequirement: 15,
    scheduled: 0,
    available: 5,
    nettRequirements: 0,
    plannedOrderReceipts: 25,
    plannedOrderRelease: 0,
  },
  {
    week: 3,
    grossRequirement: 15,
    scheduled: 25,
    available: 15,
    nettRequirements: 0,
    plannedOrderReceipts: 0,
    plannedOrderRelease: 0,
  },
  {
    week: 4,
    grossRequirement: 10,
    scheduled: 0,
    available: 5,
    nettRequirements: 0,
    plannedOrderReceipts: 0,
    plannedOrderRelease: 0,
  },
  {
    week: 5,
    grossRequirement: 15,
    scheduled: 0,
    available: 15,
    nettRequirements: 10,
    plannedOrderReceipts: 0,
    plannedOrderRelease: 25,
  },
];
@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss'],
})
export class ResultsTableComponent {
  displayedColumns: string[] = [
    'mrp-week',
    'mrp-grossRequirements',
    'mrp-scheduled',
    'mrp-available',
    'mrp-nettRequirements',
    'mrp-plannedOrderReceipts',
    'mrp-plannedOrderRelease',
  ];
  public dataSource = ELEMENT_DATA;
}
