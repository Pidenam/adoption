import { TestBed } from '@angular/core/testing';

import { AdoptantService } from './adoptant.service';

describe('AdoptantService', () => {
  let service: AdoptantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdoptantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
