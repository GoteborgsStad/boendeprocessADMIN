import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMyAdolescentsFormComponent } from './edit-my-adolescents-form.component';

describe('EditMyAdolescentsFormComponent', () => {
  let component: EditMyAdolescentsFormComponent;
  let fixture: ComponentFixture<EditMyAdolescentsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditMyAdolescentsFormComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMyAdolescentsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
