import { TestBed } from '@angular/core/testing';

import { ProtocolTypeProcessService } from './protocol-type-process.service';

describe('ProtocolTypeProcessService', () => {
  let service: ProtocolTypeProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProtocolTypeProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
