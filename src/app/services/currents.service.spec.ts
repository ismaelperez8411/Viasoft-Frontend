import { TestBed } from '@angular/core/testing';

import { CurrentsService } from './currents.service';

describe('CurrentsService', () => {
  let service: CurrentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
