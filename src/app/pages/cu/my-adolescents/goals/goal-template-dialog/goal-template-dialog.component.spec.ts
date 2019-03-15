import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalTemplateDialogComponent } from './goal-template-dialog.component';

describe('GoalTemplateDialogComponent', () => {
  let component: GoalTemplateDialogComponent;
  let fixture: ComponentFixture<GoalTemplateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalTemplateDialogComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalTemplateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
