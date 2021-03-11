import { TestBed } from '@angular/core/testing';

import { FormFieldSelectionValueService } from './form-field-selection-value.service';

describe('FormFieldSelectionValueService', () => {
  let service: FormFieldSelectionValueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormFieldSelectionValueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
