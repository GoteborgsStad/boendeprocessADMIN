import { inject, TestBed } from '@angular/core/testing';

import { GoalStatusService } from './goal-status.service';

describe('GoalStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoalStatusService],
    });
  });

  it('should be created', inject([GoalStatusService], (service: GoalStatusService) => {
    expect(service).toBeTruthy();
  }));
});
