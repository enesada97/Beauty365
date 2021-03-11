/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProtocolService } from './protocol.service';

describe('Service: Protocol', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProtocolService]
    });
  });

  it('should ...', inject([ProtocolService], (service: ProtocolService) => {
    expect(service).toBeTruthy();
  }));
});
