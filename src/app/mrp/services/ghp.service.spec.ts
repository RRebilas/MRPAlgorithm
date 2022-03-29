import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GhpService } from './ghp.service';

describe('GhpService', () => {
  let service: GhpService;

  beforeEach(() => {
    TestBed.configureTestingModule({

    });
    service = TestBed.inject(GhpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
