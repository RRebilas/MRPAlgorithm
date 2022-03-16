import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SideListComponent } from './side-list.component';

describe('SideListComponent', () => {
  let component: SideListComponent;
  let fixture: ComponentFixture<SideListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SideListComponent],
      imports: [
        MatExpansionModule,
        MatListModule,
        MatTableModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
