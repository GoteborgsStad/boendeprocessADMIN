import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditGoalFormComponent } from './edit-goal-form.component';

describe('EditGoalFormComponent', () => {
  let component: EditGoalFormComponent;
  let fixture: ComponentFixture<EditGoalFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGoalFormComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditGoalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
