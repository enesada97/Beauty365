/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProcessgroupService } from './processgroup.service';

describe('Service: Processgroup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProcessgroupService]
    });
  });

  it('should ...', inject([ProcessgroupService], (service: ProcessgroupService) => {
    expect(service).toBeTruthy();
  }));
});
