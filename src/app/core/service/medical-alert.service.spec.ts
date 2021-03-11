import { TestBed } from '@angular/core/testing';

import { MedicalAlertService } from './medical-alert.service';

describe('MedicalAlertService', () => {
  let service: MedicalAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicalAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
