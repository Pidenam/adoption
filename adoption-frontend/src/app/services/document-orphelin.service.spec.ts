import { TestBed } from '@angular/core/testing';

import { DocumentOrphelinService } from './document-orphelin.service';

describe('DocumentOrphelinService', () => {
  let service: DocumentOrphelinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumentOrphelinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
