import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GhpFormService } from './ghp-form.service';

describe('GhpFormService', () => {
  let service: GhpFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
    });
    service = TestBed.inject(GhpFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
