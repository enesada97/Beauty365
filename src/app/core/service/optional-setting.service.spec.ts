import { TestBed } from '@angular/core/testing';

import { OptionalSettingService } from './optional-setting.service';

describe('OptionalSettingService', () => {
  let service: OptionalSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OptionalSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
