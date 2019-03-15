import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEvaluateDialogComponent } from './confirm-evaluate-dialog.component';

describe('ConfirmEvaluateDialogComponent', () => {
  let component: ConfirmEvaluateDialogComponent;
  let fixture: ComponentFixture<ConfirmEvaluateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmEvaluateDialogComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmEvaluateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
