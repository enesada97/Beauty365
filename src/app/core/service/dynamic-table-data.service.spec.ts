import { TestBed } from '@angular/core/testing';

import { DynamicTableDataService } from './dynamic-table-data.service';

describe('DynamicTableDataService', () => {
  let service: DynamicTableDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicTableDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
