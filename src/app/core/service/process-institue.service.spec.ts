/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProcessInstitueService } from './process-institue.service';

describe('Service: ProcessInstitue', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessInstitueService]
    });
  });

  it('should ...', inject([ProcessInstitueService], (service: ProcessInstitueService) => {
    expect(service).toBeTruthy();
  }));
});
