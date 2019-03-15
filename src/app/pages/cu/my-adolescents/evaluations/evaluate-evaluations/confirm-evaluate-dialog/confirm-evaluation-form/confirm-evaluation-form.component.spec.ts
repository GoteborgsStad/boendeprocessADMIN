import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEvaluationFormComponent } from './confirm-evaluation-form.component';

describe('ConfirmEvaluationFormComponent', () => {
  let component: ConfirmEvaluationFormComponent;
  let fixture: ComponentFixture<ConfirmEvaluationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmEvaluationFormComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmEvaluationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
