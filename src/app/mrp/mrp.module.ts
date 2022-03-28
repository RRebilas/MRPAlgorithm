import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { GhpComponent } from './ghp/ghp.component';
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
    GhpComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatExpansionModule,
    MatListModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
  ],
  exports: [MainComponent],
})
export class MrpModule {}
