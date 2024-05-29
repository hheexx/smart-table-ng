import { TestBed } from '@angular/core/testing';

import { SmartTableNgService } from './smart-table-ng.service';

describe('SmartTableNgService', () => {
  let service: SmartTableNgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartTableNgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
