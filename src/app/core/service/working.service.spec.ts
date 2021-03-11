/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WorkingService } from './working.service';

describe('Service: Working', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkingService]
    });
  });

  it('should ...', inject([WorkingService], (service: WorkingService) => {
    expect(service).toBeTruthy();
  }));
});
