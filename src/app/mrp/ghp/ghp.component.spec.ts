import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GhpComponent } from './ghp.component';

describe('GhpComponent', () => {
  let component: GhpComponent;
  let fixture: ComponentFixture<GhpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GhpComponent],
      imports: [ReactiveFormsModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GhpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
