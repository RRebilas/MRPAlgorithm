import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MainComponent } from './main/main.component';
import { ResultsTableComponent } from './results-table/results-table.component';
import { ListElementComponent } from './side-list/list-element/list-element.component';
import { ListComponent } from './side-list/list/list.component';
import { SideListComponent } from './side-list/side-list.component';

@NgModule({
  declarations: [
    MainComponent,
    SideListComponent,
    ListElementComponent,
    ListComponent,
    ResultsTableComponent,
  ],
  imports: [CommonModule, MatExpansionModule, MatListModule, MatTableModule],
  exports: [MainComponent],
})
export class MrpModule {}
