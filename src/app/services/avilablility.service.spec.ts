import { TestBed } from '@angular/core/testing';

import { AvilablilityService } from './avilablility.service';

describe('AvilablilityService', () => {
  let service: AvilablilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvilablilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
