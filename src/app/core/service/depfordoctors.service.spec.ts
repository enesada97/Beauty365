/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DepfordoctorsService } from './depfordoctors.service';

describe('Service: Depfordoctors', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DepfordoctorsService]
    });
  });

  it('should ...', inject([DepfordoctorsService], (service: DepfordoctorsService) => {
    expect(service).toBeTruthy();
  }));
});
