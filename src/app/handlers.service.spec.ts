import { TestBed } from '@angular/core/testing';

import { HandlersService } from './handlers.service';

describe('HandlersService', () => {
  let service: HandlersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandlersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
