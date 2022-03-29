import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MrpRecord } from 'src/app/core/models/MrpRecord';
import { MrpService } from '../services/mrp.service';

@Component({
  selector: 'app-results-table',
  templateUrl: './results-table.component.html',
  styleUrls: ['./results-table.component.scss'],
})
export class ResultsTableComponent {
  dataSource$: Observable<MrpRecord[]>;

  constructor(private readonly _mrpService: MrpService) {
    this.dataSource$ = this._mrpService.dataSource$;
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
