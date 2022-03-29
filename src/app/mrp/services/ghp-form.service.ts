import { Injectable } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class GhpFormService {
  ghpForm = this._fb.group({
    inStock: [0, Validators.min(0)],
    ghpRecords: this._fb.array([]),
  });

  constructor(private readonly _fb: FormBuilder) {}

  createGhpRecord(): FormGroup {
    return this._fb.group({
      demand: [0, Validators.min(0)],
      production: [0, Validators.min(0)],
    });
  }

  get ghpRecord(): FormArray {
    return <FormArray>this.ghpForm.get('ghpRecords');
  }

  addGhpRecord(week: number): void {
    this.ghpRecord.insert(week, this.createGhpRecord());
  }

  removeGhpRecord(index: number): void {
    this.ghpRecord.removeAt(index);
  }

  getInStock(): FormControl {
    return <FormControl>this.ghpForm?.get('inStock');
  }
}
