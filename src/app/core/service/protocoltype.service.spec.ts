/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProtocoltypeService } from './protocoltype.service';

describe('Service: Protocoltype', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProtocoltypeService]
    });
  });

  it('should ...', inject([ProtocoltypeService], (service: ProtocoltypeService) => {
    expect(service).toBeTruthy();
  }));
});
