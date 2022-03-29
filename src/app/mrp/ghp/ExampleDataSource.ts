import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, Observable } from 'rxjs';

export interface PeriodicElement {
  week: number;
  demand: number;
  production?: number;
  available: number;
}

export class ExampleDataSource extends DataSource<PeriodicElement> {
  private _dataStream = new BehaviorSubject<PeriodicElement[]>([]);

  constructor(initialData: PeriodicElement[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<PeriodicElement[]> {
    return this._dataStream;
  }

  disconnect() {
    this._dataStream.unsubscribe();
  }

  setData(data: PeriodicElement[]) {
    this._dataStream.next(data);
  }

  get data() {
    return this._dataStream.getValue();
  }
}
